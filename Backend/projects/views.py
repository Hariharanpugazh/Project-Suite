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

@api_view(['POST'])
def save_project(request):
    print("Request Data:", request.data)
    print("Files:", request.FILES)

    project_data = {
        "project_name": request.data.get("projectName", ""),
        "tagline": request.data.get("tagline", ""),
        "description": request.data.get("description", ""),
        "key_features": request.data.get("keyFeatures", ""),
        "domain": request.data.get("domain", ""),
        "tech_stack": request.data.get("techStack", ""),
        "github_url": request.data.get("githubUrl", ""),
        "demo_url": request.data.get("demoUrl", ""),
        "product_id": random.randint(10000, 99999),
    }

    # Handle file uploads
    if request.FILES.get("image"):
        image_file = request.FILES["image"]
        project_data["image"] = {
            "filename": image_file.name,
            "content_type": image_file.content_type,
            "data": image_file.read(),  # Store as binary
        }

    if request.FILES.get("ppt"):
        ppt_file = request.FILES["ppt"]
        project_data["ppt"] = {
            "filename": ppt_file.name,
            "content_type": ppt_file.content_type,
            "data": ppt_file.read(),  # Store as binary
        }

    # Save to MongoDB
    collection.insert_one(project_data)

    return Response(
        {"message": "Project saved successfully", "product_id": project_data["product_id"]},
        status=201
    )

@api_view(['GET'])
def get_projects(request):
    try:
        # Fetch all project data from the MongoDB collection
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
                    "product_id": project.get("product_id", ""),
                }

                # Include image if it exists
                if "image" in project and "data" in project["image"]:
                    project_data["image"] = {
                        "filename": project["image"].get("filename"),
                        "content_type": project["image"].get("content_type"),
                        "data": base64.b64encode(project["image"]["data"]).decode("utf-8"),
                    }

                # Include PPT if it exists
                if "ppt" in project:
                    project_data["ppt"] = {
                        "filename": project["ppt"].get("filename"),
                    }

                project_list.append(project_data)

            except Exception as e:
                # Log individual document errors but continue processing
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