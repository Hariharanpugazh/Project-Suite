from django.urls import path
from .views import save_project, get_projects

urlpatterns = [
    path('save-project/', save_project, name='save_project'),
     path('get-projects/', get_projects, name='get_projects'),  # New route
]
