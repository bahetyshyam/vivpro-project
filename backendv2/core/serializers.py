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
        return obj.user_rating
    