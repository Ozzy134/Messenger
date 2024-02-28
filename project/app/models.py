from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission
from django.db import models

# class CustomUser(AbstractUser):
#     email = models.EmailField()
#     name = models.CharField(max_length=20)
#     password = models.CharField(max_length=30)
#     groups = models.ManyToManyField(
#         Group,
#         verbose_name=('groups'),
#         blank=True,
#         related_name='customuser_set',
#         related_query_name='customuser',
#     )
#     user_permissions = models.ManyToManyField(
#         Permission,
#         verbose_name=('user permissions'),
#         blank=True,
#         related_name='customuser_set',
#         related_query_name='customuser',
#     )
#
# class Token(models.Model):
#     key = models.CharField(max_length=40, primary_key=True)
#     user = models.OneToOneField(
#         CustomUser,
#         related_name='auth_token',
#         on_delete=models.CASCADE,
#     )
#     created = models.DateTimeField(auto_now_add=True)

class Note(models.Model):
    user_id = models.IntegerField()
    title = models.CharField(max_length=20)
    description = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def __str__(self):
        return self.title

class User(models.Model):
    email = models.EmailField()
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.username
