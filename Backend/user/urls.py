# exercises/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('<uuid:uuid>/change_password/', ChangePasswordView.as_view(), name='change_password'),
]