from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Subquery, OuterRef
from ..models import Track, Rating
from ..serializers import TrackWithRatingSerializer
from ..pagination import CustomPagination

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tracks_paginated(request):
    title_query = request.GET.get('title', None)
    sort_by = request.GET.get('sort_by', None)
    sort_order = request.GET.get('sort_order', 'asc')

    paginator = CustomPagination()
    tracks = Track.objects.all()

    # Filter by title if provided
    if title_query:
        tracks = tracks.filter(title__icontains=title_query)

    # Annotate with the user's specific rating
    tracks = tracks.annotate(
        user_rating=Subquery(
            Rating.objects.filter(
                track=OuterRef('track_id'),
                user=request.user
            ).values('rating')[:1]
        )
    )

    # Validate sort_by and sort_order
    valid_sort_fields = ['title', 'danceability', 'energy', 'loudness', 'mode', 'acousticness', 
                        'instrumentalness', 'liveness', 'valence', 'tempo', 'duration_ms', 
                        'time_signature', 'num_bars', 'num_sections', 'num_segments', 
                        'track_class', 'user_rating']
    valid_sort_orders = ['asc', 'desc']

    if sort_by and sort_by not in valid_sort_fields:
        return Response({'error': f'Invalid sort_by field. Valid fields are: {", ".join(valid_sort_fields)}'}, 
                       status=status.HTTP_400_BAD_REQUEST)

    if sort_order and sort_order not in valid_sort_orders:
        return Response({'error': f'Invalid sort_order value. Valid values are: {", ".join(valid_sort_orders)}'}, 
                       status=status.HTTP_400_BAD_REQUEST)

    # Apply sorting
    if sort_by:
        if sort_order == 'desc':
            sort_by = f'-{sort_by}'
        tracks = tracks.order_by(sort_by)

    result_page = paginator.paginate_queryset(tracks, request)
    serializer = TrackWithRatingSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_track(request, track_id):
    track = get_object_or_404(Track, track_id=track_id)
    rating_value = request.data.get('rating')

    # Validate rating value
    if not rating_value or not (1 <= int(rating_value) <= 5):
        return Response({'error': 'Rating must be between 1 and 5'}, status=status.HTTP_400_BAD_REQUEST)

    # Create or update rating
    rating_obj, created = Rating.objects.update_or_create(
        user=request.user,
        track=track,
        defaults={'rating': int(rating_value)}
    )

    action = "created" if created else "updated"
    return Response({
        'message': f'Rating {action} successfully',
        'rating': rating_obj.rating,
    }, status=status.HTTP_200_OK)