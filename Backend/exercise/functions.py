from django.conf import settings
from django.http import HttpResponse
from database.minio_client import minio_client
from django.core.files.uploadedfile import InMemoryUploadedFile
from minio.error import S3Error
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
import fitz  # PyMuPDF
import io
from PyPDF2 import PdfReader
from PIL import Image

# def download_exercise_pdf(request, exercise_uuid):
#     exercise = get_object_or_404(Exercise, uuid=exercise_id)
#     if exercise.pdf:
#         response = HttpResponse(exercise.pdf, content_type='application/pdf')
#         response['Content-Disposition'] = f'attachment; filename="{exercise.pdf.name}"'
#         return response
#     return HttpResponse(status=404)


def download_file_from_minio(bucket_name: str, object_name: str):
    try:
        response = minio_client.get_object(bucket_name, object_name)
        return HttpResponse(response.data, content_type=response.headers['Content-Type'])
    except S3Error as e:
        print(f"Erreur lors du téléchargement du fichier : {e}")
        return HttpResponse(status=404)
    
def upload_file_to_minio(file: InMemoryUploadedFile, bucket_name: str, object_name: str) -> bool:
    # Vérifie si le bucket existe, sinon le crée
    bucket_name = settings.AWS_STORAGE_BUCKET_NAME
    if not minio_client.bucket_exists(bucket_name):
        minio_client.make_bucket(bucket_name)
    try:
        minio_client.put_object(
            bucket_name,
            object_name,
            file,
            length=file.size,
            content_type=file.content_type,
        )
        return True
    except S3Error as e:
        print(f"Erreur lors de l'upload du fichier : {e}")
        return False
    
def validate_pdf(file):
    if not file.content_type == 'application/pdf':
        raise ValidationError("Seuls les fichiers PDF sont autorisés.")
    if not file.name.lower().endswith('.pdf'):
        raise ValidationError("L'extension du fichier doit être .pdf")
    
    max_size = 10 * 1024 * 1024  # 10 MB en octets
    if file.size > max_size:
        raise ValidationError("Le fichier est trop volumineux. La taille maximale autorisée est de 10 MB.")
    

def extract_pdf_content_from_minio(bucket_name: str, object_name: str):
    """
    Télécharge un PDF depuis MinIO et extrait son contenu
    Returns:
        tuple: (texte, liste_images) ou (None, None) en cas d'erreur
    """
    try:
        # Télécharger le fichier depuis MinIO
        response = minio_client.get_object(bucket_name, object_name)
        pdf_bytes = io.BytesIO(response.read())
        
        # Extraction du texte avec PyPDF2
        text_content = ""
        pdf_reader = PdfReader(pdf_bytes)
        for page in pdf_reader.pages:
            text_content += page.extract_text()
        
        # Retour au début du fichier pour l'extraction des images
        pdf_bytes.seek(0)
        
        # Extraction des images avec PyMuPDF
        images = []
        pdf_document = fitz.open(stream=pdf_bytes.read(), filetype="pdf")
        
        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]
            image_list = page.get_images(full=True)
            
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = pdf_document.extract_image(xref)
                image_bytes = base_image["image"]
                
                image = Image.open(io.BytesIO(image_bytes))
                images.append({
                    'page': page_num + 1,
                    'index': img_index + 1,
                    'image': image,
                    'format': base_image["ext"],
                    'size': len(image_bytes)
                })
        
        pdf_document.close()
        return text_content, images
        
    except S3Error as e:
        print(f"Erreur lors du téléchargement depuis MinIO : {e}")
        return None, None
    except Exception as e:
        print(f"Erreur lors de l'extraction du contenu : {e}")
        return None, None