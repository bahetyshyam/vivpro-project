from django.urls import path
from .views import health_check, RegisterView, login_view, logout_view, me_view, get_tracks_paginated, rate_track

urlpatterns = [
  path('health', health_check, name='health_check'),
  path('register', RegisterView.as_view(), name= 'register'),
  path('login', login_view, name = 'login'),
  path('logout', logout_view, name = "logout"),
  path('me', me_view, name = 'me'),
  path('tracks', get_tracks_paginated, name='get_tracks_paginated'),
  path('tracks/<str:track_id>/rate', rate_track, name='rate_track')
]