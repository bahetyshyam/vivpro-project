from django.db import models
from django.contrib.auth.models import User
import uuid

class Track(models.Model):
    track_id = models.CharField(max_length=50, primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    danceability = models.FloatField()
    energy = models.FloatField()
    key = models.IntegerField()
    loudness = models.FloatField()
    mode = models.IntegerField()
    acousticness = models.FloatField()
    instrumentalness = models.FloatField()
    liveness = models.FloatField()
    valence = models.FloatField()
    tempo = models.FloatField()
    duration_ms = models.IntegerField()
    time_signature = models.IntegerField()
    num_bars = models.IntegerField()
    num_sections = models.IntegerField()
    num_segments = models.IntegerField()
    track_class = models.IntegerField()

    def __str__(self):
        return f"{self.title} ({self.track_id})"


class Rating(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    rating = models.IntegerField()  # e.g., 1-5 stars
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'track')  # Prevents duplicate ratings by same user for same track

    def __str__(self):
        return f"{self.user.username} rated '{self.track.title}' {self.rating}/5"
