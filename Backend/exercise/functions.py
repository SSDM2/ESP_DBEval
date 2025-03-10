from django.conf import settings
from django.http import HttpResponse
from database.minio_client import minio_client
from django.core.files.uploadedfile import InMemoryUploadedFile
from minio.error import S3Error
from rest_framework.response import Response
from rest_framework import status

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