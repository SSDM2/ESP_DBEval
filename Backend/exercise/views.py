from django.conf import settings
from exercise.functions import upload_file_to_minio, validate_pdf
import io
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Exercise, Classroom
from rest_framework.decorators import action
from .serializers import ExerciseSerializer
from django.core.exceptions import ValidationError
from .functions import extract_pdf_content_from_minio
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'uuid'
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    # def create(self, request):
    #     # Vérifier que l'utilisateur est un professeur
    #     user = self.request.user
    #     if not user.is_professor:
    #         return Response({"error": "Only professors can create exercises"}, status=status.HTTP_403_FORBIDDEN)
        
    #     # Récupérer la classe associée
    #     classroom_id = self.request.data.get('classroom')
        
    #     try:
    #         classroom = Classroom.objects.get(uuid=classroom_id)
    #     except Classroom.DoesNotExist:
    #         return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)

    #     # Vérifier que le professeur est bien le professeur de la classe
    #     if classroom.professor != self.request.user:
    #         return Response({"error": "You are not the professor of this classroom"}, status=status.HTTP_403_FORBIDDEN)

    #     data = request.data
    #     data['classroom'] = classroom.uuid  # Associer la classe à l'exercice
    #     data['sender'] = user.uuid

    #     serializer = self.get_serializer(data=data)  # Utiliser les données avec le serializer
    #     if serializer.is_valid():
    #         serializer.save()  # Sauvegarder l'exercice
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retourner la réponse avec l'exercice créé
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retourner les erreurs du serializer si invalide
    
    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     context['request'] = self.request
    #     return context

    # def create(self, request):
    #     # Vérifier que l'utilisateur est un professeur
    #     user = self.request.user
    #     if not user.is_professor:
    #         return Response({"error": "Only professors can create exercises"}, status=status.HTTP_403_FORBIDDEN)
        
    #     # Récupérer la classe associée
    #     classroom_id = self.request.data.get('classroom')
        
    #     try:
    #         classroom = Classroom.objects.get(uuid=classroom_id)
    #     except Classroom.DoesNotExist:
    #         return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)

    #     # Vérifier que le professeur est bien le professeur de la classe
    #     if classroom.professor != self.request.user:
    #         return Response({"error": "You are not the professor of this classroom"}, status=status.HTTP_403_FORBIDDEN)

    #     data = request.data
    #     data['classroom'] = classroom.uuid  # Associer la classe à l'exercice
    #     data['sender'] = user.uuid

    #     serializer = self.get_serializer(data=data)  # Utiliser les données avec le serializer
    #     if serializer.is_valid():
    #         serializer.save()  # Sauvegarder l'exercice
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retourner la réponse avec l'exercice créé
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retourner les erreurs du serializer si invalide
    
    def create(self, request):
        pdf_file = request.FILES.get('pdf')
        if not pdf_file:
            return Response({"error": "pdf file is mandatory"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Vérifier que l'utilisateur est un professeur
        user = self.request.user
        if not user.is_professor:
            return Response({"error": "Only professors can create exercises"}, status=status.HTTP_403_FORBIDDEN)
        
        # Récupérer la classe associée
        classroom_id = self.request.data.get('classroom')
        
        try:
            classroom = Classroom.objects.get(uuid=classroom_id)
        except Classroom.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)

        # Vérifier que le professeur est bien le professeur de la classe
        if classroom.professor != self.request.user:
            return Response({"error": "You are not the professor of this classroom"}, status=status.HTTP_403_FORBIDDEN)


        # Valider la taille du fichier
        try:
            validate_pdf(pdf_file)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Générer un nom unique pour le fichier
        object_name = f"exercises/{pdf_file.name.replace(' ', '_').lower()}"
        data = request.data
        data['classroom'] = classroom.uuid  # Associer la classe à l'exercice
        data['sender'] = user.uuid
        data['pdf'] = object_name

        # Uploader le fichier vers MinIO
        if not upload_file_to_minio(pdf_file, settings.AWS_STORAGE_BUCKET_NAME, object_name):
            return Response({"error": "Erreur lors de l'upload du fichier"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        # Sauvegarder l'exercice dans la base de données
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Afficher le contenu d'un PDF
    @swagger_auto_schema(
        operation_description="Récupère le contenu texte et les images d'un fichier PDF d'exercice",
        operation_summary="Extraire le contenu d'un PDF",
        responses={
            200: openapi.Response(
                description='Contenu du PDF extrait avec succès',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'text': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Contenu textuel extrait du PDF'
                        ),
                        'images': openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            description='Liste des images extraites du PDF',
                            items=openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                properties={
                                    'url': openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description='Chemin de l\'image dans MinIO'
                                    ),
                                    'page': openapi.Schema(
                                        type=openapi.TYPE_INTEGER,
                                        description='Numéro de la page contenant l\'image'
                                    ),
                                    'format': openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description='Format de l\'image (jpg, png, etc.)'
                                    )
                                }
                            )
                        )
                    }
                )
            ),
            400: openapi.Response(
                description='Erreur lors de l\'extraction du contenu',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message d\'erreur'
                        )
                    }
                )
            ),
            404: openapi.Response(
                description='Exercice non trouvé',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message d\'erreur'
                        )
                    }
                )
            )
        }
    )
    @action(detail=True, methods=['get'], url_path='content')
    def get_pdf_content(self, request, uuid):
        try:
            exercise = Exercise.objects.get(uuid=uuid)
            text_content, images = extract_pdf_content_from_minio(
                settings.AWS_STORAGE_BUCKET_NAME,
                exercise.pdf
            )
            
            if text_content is None:
                return Response(
                    {"error": "Erreur lors de l'extraction du contenu"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Sauvegarder les images extraites si nécessaire
            saved_images = []
            for idx, img_data in enumerate(images):
                image_name = f"exercise_images/{exercise.uuid}_{idx}.{img_data['format']}"
                
                # Convertir l'image PIL en bytes
                img_byte_arr = io.BytesIO()
                img_data['image'].save(img_byte_arr, format=img_data['format'])
                img_byte_arr = img_byte_arr.getvalue()
                
                # Upload vers MinIO
                if upload_file_to_minio(
                    io.BytesIO(img_byte_arr),
                    settings.AWS_STORAGE_BUCKET_NAME,
                    image_name
                ):
                    saved_images.append({
                        'url': image_name,
                        'page': img_data['page'],
                        'format': img_data['format']
                    })
            
            return Response({
                'text': text_content,
                'images': saved_images
            }, status=status.HTTP_200_OK)
            
        except Exercise.DoesNotExist:
            return Response(
                {"error": "Exercise not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )