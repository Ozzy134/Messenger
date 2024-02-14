from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .models import Note
from .serializers import NoteSerializer, UserSerializer, UserAuthenticationSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

"""
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        Token.objects.create(user=user)
"""
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return user, token

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'id': user.id, 'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)

class LoginView(APIView):
    def post(self, request):
        # User.objects.all().update(is_active=True)
        password = request.data.get('password')
        username = request.data.get('username')

        user = authenticate(username=username, password=password)

        # if user in User.objects.all():
        if user:
            # Пользователь аутентифицирован, создаем или обновляем токен
            token, created = Token.objects.get_or_create(user=user)
            return Response({'id': user.id, 'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Неверные учетные данные
            return Response({'error': user}, status=status.HTTP_401_UNAUTHORIZED)

class UserAuthenticationView(APIView):
    def post(self, request):
        serializer = UserAuthenticationSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                return Response({'message': 'User authenticated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class NoteListView(APIView):
    def get(self, request, user_id):
        user_notes = Note.objects.filter(user_id=user_id)
        serializer = NoteSerializer(user_notes, many=True)
        return Response(serializer.data)
