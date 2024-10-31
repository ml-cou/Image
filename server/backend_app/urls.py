
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import *

urlpatterns = [
    path('image/', ImageView.as_view()),
    path('image/<int:pk>/', ImageView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)