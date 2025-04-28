from django.core.management.base import BaseCommand
from core.models import Track
import json
import os

class Command(BaseCommand):
    help = 'Seed the database with track data from playlist.json'

    def handle(self, *args, **kwargs):
        file_path = os.path.join('core', 'playlist.json')
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
            return

        with open(file_path) as f:
            data = json.load(f)

        created_count = 0
        for idx in data['id'].keys():
            track, created = Track.objects.get_or_create(
                track_id=data['id'][idx],
                defaults={
                    'title': data['title'][idx],
                    'danceability': data['danceability'][idx],
                    'energy': data['energy'][idx],
                    'key': data['key'][idx],
                    'loudness': data['loudness'][idx],
                    'mode': data['mode'][idx],
                    'acousticness': data['acousticness'][idx],
                    'instrumentalness': data['instrumentalness'][idx],
                    'liveness': data['liveness'][idx],
                    'valence': data['valence'][idx],
                    'tempo': data['tempo'][idx],
                    'duration_ms': data['duration_ms'][idx],
                    'time_signature': data['time_signature'][idx],
                    'num_bars': data['num_bars'][idx],
                    'num_sections': data['num_sections'][idx],
                    'num_segments': data['num_segments'][idx],
                    'track_class': data['class'][idx],
                }
            )
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {created_count} tracks.'))
