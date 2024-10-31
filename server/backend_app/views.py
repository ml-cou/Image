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
        search_query = request.query_params.get('search', '')
        sort_by = request.query_params.get('sort_by', '-created_at')
        
        images = Photo.objects.filter(title__icontains=search_query).order_by(sort_by)
        serializer = PhotoSerializer(images, many=True, context={'request': request})
        return Response({'images': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        try:
            images = request.FILES.getlist('files')
            for image in reversed(images):
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
    
    def put(self, request, pk):
        try:
            image = Photo.objects.get(pk=pk)
            new_title = request.data['title']
            image.title = new_title
            image.save()
            return Response({'message': 'Image title updated successfully'}, status=status.HTTP_200_OK)
        except Photo.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error updating image title: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, pk):
        try:
            image = Photo.objects.get(pk=pk)
            image.delete()
            return Response({'message': 'Image deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Photo.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error deleting image: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)