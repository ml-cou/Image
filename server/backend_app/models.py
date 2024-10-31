from django.db import models

class Photo(models.Model):
    image = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    width = models.PositiveIntegerField(blank=True, null=True)
    height = models.PositiveIntegerField(blank=True, null=True)
    horizontal_resolution = models.FloatField(blank=True, null=True)
    vertical_resolution = models.FloatField(blank=True, null=True)
    bit_depth = models.PositiveIntegerField(blank=True, null=True)
    color_representation = models.CharField(max_length=50, blank=True, null=True)