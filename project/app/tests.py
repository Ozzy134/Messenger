from django.test import TestCase
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status

class AuthenticationTests(APITestCase):
    def setUp(self):
        # Создаем тестового пользователя
        self.user_data = {'username': 'testuser', 'password': 'testpassword', 'email': 'test@example.com'}
        self.user = User.objects.create_user(**self.user_data)

    def test_registration(self):
        # Проверяем успешную регистрацию
        data = {'username': 'newuser', 'password': 'newpassword', 'email': 'new@example.com'}
        response = self.client.post('/api/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)

    def test_authentication(self):
        # Проверяем успешную аутентификацию
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post('/api/token/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_user_profile(self):
        # Проверяем доступ к профилю после аутентификации
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['email'], 'test@example.com')

