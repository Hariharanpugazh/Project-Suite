from django.urls import path
from .views import save_project, get_projects, get_project_details, register_user, login_user, get_projects_by_staff_id, edit_project
from . import views
urlpatterns = [
    path('save-project/', save_project, name='save_project'),
    path('get-projects/', get_projects, name='get_projects'),
    path('<int:product_id>/', get_project_details, name='get_project_details'),
    path('get-projects-by-staff-id/', get_projects_by_staff_id, name='get_projects_by_staff_id'),
    path('register/', register_user, name='register_user'),
    path('login/', login_user, name='login_user'),
    path('edit/<int:product_id>/', edit_project, name='edit_project'),
    path('delete/<int:product_id>/', views.delete_project, name='delete_project'),

]
