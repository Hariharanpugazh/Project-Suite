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
    # Extract and sanitize teamNames array from the request
    team_names = []
    for i in range(4):  # Expecting 4 team members
        team_name = request.data.get(f"teamNames[{i}]", None)
        team_names.append(sanitize_field(team_name))

    # Construct the project data
    project_data = {
        "project_name": sanitize_field(request.data.get("title")),  # Matches "title"
        "tagline": sanitize_field(request.data.get("tags")),  # Matches "description"
        "college": sanitize_field(request.data.get("college")),  # NEW FIELD
        "description": sanitize_field(request.data.get("problemStatement")),  # Matches "problemStatement"
        "key_features": sanitize_field(request.data.get("keyFeatures")),  # Matches "keyFeatures"
        "domain": sanitize_field(request.data.get("domain")),  # Matches "domain"
        "tech_stack": sanitize_field(request.data.get("tags")),  # Matches "tags"
        "github_url": sanitize_field(request.data.get("githubUrl")),  # Matches "githubUrl"
        "demo_url": sanitize_field(request.data.get("youtubeUrl")),  # Matches "youtubeUrl"
        "presentation_layer": sanitize_field(request.data.get("presentationLayer")),  # Matches "presentationLayer"
        "application_layer": sanitize_field(request.data.get("applicationLayer")),  # Matches "applicationLayer"
        "data_layer": sanitize_field(request.data.get("dataLayer")),  # Matches "dataLayer"
        "methodology": sanitize_field(request.data.get("methodology")),  # Matches "methodology"
        "tools": sanitize_field(request.data.get("tools")),  # Matches "tools"
        "api": sanitize_field(request.data.get("api")),  # Matches "api"
        "team_count": int(request.data.get("teamCount", 1)),  # Matches "teamCount"
        "team_names": team_names,  # Matches sanitized team names
        "associate_project_mentor": sanitize_field(request.data.get("associateProjectMentor")),  # Matches "associateProjectMentor"
        "associate_tech_mentor": sanitize_field(request.data.get("associateTechMentor")),  # Matches "associateTechMentor"
        "dt_mentor": sanitize_field(request.data.get("dtMentor")),  # Matches "dtMentor"
        "product_id": random.randint(10000, 99999),  # Auto-generated
    }

    # Handle file uploads
    if request.FILES.get("image"):
        image_file = request.FILES["image"]
        project_data["image"] = {
            "filename": image_file.name,
            "content_type": image_file.content_type,
            "data": image_file.read(),  # Store as binary
        }
    else:
        project_data["image"] = "NA"  # Default for missing images

    if request.FILES.get("ppt"):
        ppt_file = request.FILES["ppt"]
        project_data["ppt"] = {
            "filename": ppt_file.name,
            "content_type": ppt_file.content_type,
            "data": ppt_file.read(),  # Store as binary
        }
    else:
        project_data["ppt"] = "NA"  # Default for missing PPTs

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