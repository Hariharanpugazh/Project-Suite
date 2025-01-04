from django.urls import path
from .views import save_project, get_projects, get_project_details, register_user, login_user, get_projects_by_staff_id, edit_project, get_staff_data
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
    path('get_staff_data/', views.get_staff_data, name='get_staff_data'),
    path('assign_project/', views.assign_project, name='assign_project'),
    path('get-all-projects/', views.get_all_projects),
    path('get-projects-by-staff-id/', get_projects_by_staff_id, name='get_projects_by_staff_id'),
]
