from minio import Minio
from django.conf import settings


minio_client = Minio(
     'minio:9000',
    access_key=settings.AWS_ACCESS_KEY_ID,
    secret_key=settings.AWS_SECRET_ACCESS_KEY,
    secure=settings.AWS_S3_USE_SSL,
)
