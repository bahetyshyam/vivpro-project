from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def health_check(request):
    """
    A simple health check view that returns a JSON response indicating the service is healthy.
    """
    return JsonResponse({"status": "ok"})