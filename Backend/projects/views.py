from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from pymongo import MongoClient
import random
import logging


# Connect to MongoDB
client = MongoClient(settings.MONGODB_URI)
db = client[settings.MONGO_DB_NAME]
collection = db["projects"]

logger = logging.getLogger(__name__)

@api_view(['POST'])
def save_project(request):
    print("Request Data:", request.data)  # Add this line
    print("Files:", request.FILES)       # Add this line

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
            "data": image_file.read().decode('latin1'),
        }

    if request.FILES.get("ppt"):
        ppt_file = request.FILES["ppt"]
        project_data["ppt"] = {
            "filename": ppt_file.name,
            "content_type": ppt_file.content_type,
            "data": ppt_file.read().decode('latin1'),
        }

    # Save to MongoDB
    collection.insert_one(project_data)

    return Response(
        {"message": "Project saved successfully", "product_id": project_data["product_id"]},
        status=201
    )