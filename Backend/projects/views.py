from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import random
import logging
from bson.objectid import ObjectId
import base64

# Connect to MongoDB
client = MongoClient(settings.MONGODB_URI)
db = client[settings.MONGO_DB_NAME]
collection = db["projects"]

logger = logging.getLogger(__name__)

def sanitize_field(field_value, default="NA"):
    if field_value is None:
        return default
    value = str(field_value).strip()
    return value if value else default

@api_view(['POST'])
def save_project(request):
    # Extract and sanitize general project fields
    project_data = {
        "title": sanitize_field(request.data.get("title")),
        "description": sanitize_field(request.data.get("description")),
        "college": sanitize_field(request.data.get("college")),
        "problem_statement": sanitize_field(request.data.get("problemStatement")),
        "key_features": sanitize_field(request.data.get("keyFeatures")),
        "scope": sanitize_field(request.data.get("scope")),
        "presentation_layer": sanitize_field(request.data.get("presentationLayer")),
        "application_layer": sanitize_field(request.data.get("applicationLayer")),
        "data_layer": sanitize_field(request.data.get("dataLayer")),
        "methodology": sanitize_field(request.data.get("methodology")),
        "tools": sanitize_field(request.data.get("tools")),
        "api": sanitize_field(request.data.get("api")),
        "team_count": int(request.data.get("teamCount", 0)),
        "associate_project_mentor": sanitize_field(request.data.get("associateProjectMentor")),
        "associate_tech_mentor": sanitize_field(request.data.get("associateTechMentor")),
        "dt_mentor": sanitize_field(request.data.get("dtMentor")),
        "tech_stack": sanitize_field(request.data.get("tags")),
        "github_url": sanitize_field(request.data.get("githubUrl")),
        "demo_url": sanitize_field(request.data.get("youtubeUrl")),
        "product_id": random.randint(10000, 99999),
    }

    # Process team member details
    team_members = []
    for i in range(project_data["team_count"]):
        member_data = {
            "name": sanitize_field(request.data.get(f"teamMembers[{i}][name]")),
            "image": (
                request.FILES.get(f"teamMembers[{i}][image]").read()
                if request.FILES.get(f"teamMembers[{i}][image]")
                else None
            ),
        }
        team_members.append(member_data)
    project_data["team_members"] = team_members

    # Process mentors' images
    def get_mentor_image(field_name):
        file = request.FILES.get(field_name)
        return file.read() if file else None

    project_data["associate_project_mentor_image"] = get_mentor_image("associateProjectMentorImage")
    project_data["associate_tech_mentor_image"] = get_mentor_image("associateTechMentorImage")
    project_data["dt_mentor_image"] = get_mentor_image("dtMentorImage")

    # Handle project image
    image_file = request.FILES.get("image")
    project_data["image"] = image_file.read() if image_file else None

    # Handle project PPT
    ppt_file = request.FILES.get("ppt")
    project_data["ppt"] = ppt_file.read() if ppt_file else None

    # Debugging log
    print("Final project data:", project_data)

    # Save to MongoDB
    collection.insert_one(project_data)

    return Response(
        {"message": "Project saved successfully", "product_id": project_data["product_id"]},
        status=201
    )

@api_view(['GET'])
def get_projects(request):
    try:
        projects = collection.find()
        project_list = []

        for project in projects:
            try:
                project_data = {
                    "project_name": project.get("project_name", ""),
                    "tagline": project.get("tagline", ""),
                    "description": project.get("description", ""),
                    "key_features": project.get("key_features", ""),
                    "domain": project.get("domain", ""),
                    "tech_stack": project.get("tech_stack", ""),
                    "github_url": project.get("github_url", ""),
                    "demo_url": project.get("demo_url", ""),
                    "college": project.get("college", ""),  # Add this field
                    "product_id": project.get("product_id", ""),
                }

                if "image" in project and "data" in project["image"]:
                    project_data["image"] = {
                        "filename": project["image"].get("filename"),
                        "content_type": project["image"].get("content_type"),
                        "data": base64.b64encode(project["image"]["data"]).decode("utf-8"),
                    }

                if "ppt" in project:
                    project_data["ppt"] = {"filename": project["ppt"].get("filename")}

                project_list.append(project_data)

            except Exception as e:
                print(f"Error processing project: {project.get('_id', 'unknown')} - {str(e)}")
                continue

        return Response(project_list, status=200)

    except Exception as e:
        print(f"Error fetching projects: {str(e)}")
        return Response({"error": "Could not fetch projects"}, status=500)
    
# Helper function to serialize MongoDB documents
def serialize_mongo_document(document):
    def serialize_value(value):
        if isinstance(value, ObjectId):
            return str(value)
        elif isinstance(value, bytes):
            # Encode binary data as Base64 string
            return base64.b64encode(value).decode("utf-8")
        elif isinstance(value, dict):
            # Recursively serialize nested dictionaries
            return {k: serialize_value(v) for k, v in value.items()}
        elif isinstance(value, list):
            # Recursively serialize lists
            return [serialize_value(v) for v in value]
        else:
            return value

    if document:
        return {key: serialize_value(value) for key, value in document.items()}
    return document

@csrf_exempt
def get_project_details(request, product_id):
    if request.method == "GET":
        try:
            # Fetch the project using product_id
            project = collection.find_one({"product_id": int(product_id)})

            if project:
                project = serialize_mongo_document(project)
                return JsonResponse(project, safe=False)
            else:
                return JsonResponse({"error": "Project not found."}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid HTTP method."}, status=405)