from rest_framework import serializers
from .models import Note
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Указываем, что поле пароля должно использоваться только для записи

    def create(self, validated_data):
        # Извлекаем пароль из валидированных данных
        password = validated_data.pop('password', None)
        # Создаем пользователя, вызывая метод create_user() модели User
        user = User.objects.create(**validated_data)
        # Устанавливаем пароль для пользователя с помощью метода set_password()
        if password:
            user.set_password(password)
            user.save()
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'user_id', 'title', 'description', 'created_at', 'updated_at']
        extra_kwargs = {
            'id': {'required': False},
            'user_id': {'required': True},
            'title': {'required': True},
            'description': {'required': True},
            'created_at': {'required': False},
            'updated_at': {'required': False}
        }

class UserAuthenticationSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()