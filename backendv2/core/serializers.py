from rest_framework import serializers
from .models import Track, Rating

class TrackWithRatingSerializer(serializers.ModelSerializer):
    user_rating = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = [
            'track_id', 'title', 'danceability', 'energy', 'key',
            'loudness', 'mode', 'acousticness', 'instrumentalness',
            'liveness', 'valence', 'tempo', 'duration_ms',
            'time_signature', 'num_bars', 'num_sections',
            'num_segments', 'track_class', 'user_rating'
        ]

    def get_user_rating(self, obj):
        user = self.context.get('request').user
        rating = Rating.objects.filter(user=user, track=obj).first()
        return rating.rating if rating else None
    