from .views import NoteListCreateView, NoteDetailView
from django.urls import path
from .views import RegisterView, UserProfileView, LoginView, UserAuthenticationView, UserListView, NoteListView

urlpatterns = [
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/<int:user_id>/', NoteListView.as_view(), name='user-notes'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    # path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-delete'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserListView.as_view(), name='users'),
]