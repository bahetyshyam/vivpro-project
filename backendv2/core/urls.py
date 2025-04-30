from django.urls import path
from .views.health import health_check
from .views.auth import RegisterView, login_view, logout_view, me_view
from .views.tracks import get_tracks_paginated, rate_track
from .constants.urls import (
    HEALTH_CHECK,
    REGISTER,
    LOGIN,
    LOGOUT,
    ME,
    TRACKS,
    RATE,
)

urlpatterns = [
    path(HEALTH_CHECK, health_check, name='health_check'),
    path(REGISTER, RegisterView.as_view(), name='register'),
    path(LOGIN, login_view, name='login'),
    path(LOGOUT, logout_view, name="logout"),
    path(ME, me_view, name='me'),
    path(TRACKS, get_tracks_paginated, name='get_tracks_paginated'),
    path(f'{TRACKS}/<str:track_id>/{RATE}', rate_track, name='rate_track')
]