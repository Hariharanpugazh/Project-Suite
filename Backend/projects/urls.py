from django.urls import path
from .views import save_project, get_projects, get_project_details

urlpatterns = [
    path('save-project/', save_project, name='save_project'),
     path('get-projects/', get_projects, name='get_projects'),  # New route
     path("<int:product_id>/", get_project_details, name="get_project_details"),
]