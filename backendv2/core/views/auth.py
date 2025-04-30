from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout

def validate_credentials(username: str, password: str):
    if not username or not password:
        return "Username and password are required"
    
    username = username.strip()
    password = password.strip()
    
    if len(username) < 5 or len(username) > 15:
        return "Username must be between 5 and 15 characters"
    
    if len(password) < 5 or len(password) > 15:
        return "Password must be between 5 and 15 characters"
    
    if not username.strip() or not password.strip():
        return "Username and password cannot be empty spaces"
    
    return None

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        validation_error = validate_credentials(username, password)
        if validation_error:
            return Response({'error': validation_error}, status=status.HTTP_400_BAD_REQUEST)
        
        username = username.strip()
        password = password.strip()
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        User.objects.create(username=username, password=make_password(password))
        return Response({
            'message': 'User created successfully'
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    validation_error = validate_credentials(username, password)
    if validation_error:
        return Response({'error': validation_error}, status=status.HTTP_400_BAD_REQUEST)
    
    username = username.strip()
    password = password.strip()

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'username': user.username})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    return Response({'username': request.user.username})