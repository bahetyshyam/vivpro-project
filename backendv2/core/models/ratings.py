from django.db import models
from django.contrib.auth.models import User
import uuid
from .tracks import Track

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