# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Photo
from PIL import Image
from PIL.ExifTags import TAGS
from .serializers import PhotoSerializer

class ImageView(APIView):
    def get(self, request):
        images = Photo.objects.all()
        serializer = PhotoSerializer(images, many=True, context={'request': request})
        return Response({'images': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            images = request.FILES.getlist('files')
            for image in images:
                pil_image = Image.open(image)
                
                title = pil_image.info.get('title', image.name)
                
                width, height = pil_image.size
                horizontal_resolution = pil_image.info.get('dpi', (72, 72))[0]
                vertical_resolution = pil_image.info.get('dpi', (72, 72))[1]
                bit_depth = pil_image.mode 
                color_representation = pil_image.info.get('color_space', 'sRGB')
                
                Photo.objects.create(
                    image=image,
                    title=title,
                    description=request.data.get('description', ''),
                    width=width,
                    height=height,
                    horizontal_resolution=horizontal_resolution,
                    vertical_resolution=vertical_resolution,
                    bit_depth=24 if bit_depth == 'RGB' else 8,
                    color_representation=color_representation,
                )
            return Response({'message': 'Images uploaded successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': f'Error uploading images: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
