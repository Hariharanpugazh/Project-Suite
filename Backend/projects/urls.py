from django.urls import path
from .views import save_project

urlpatterns = [
    path('save-project/', save_project, name='save_project'),
]
