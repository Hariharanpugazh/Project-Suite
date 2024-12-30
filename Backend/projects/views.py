from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from pymongo import MongoClient
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