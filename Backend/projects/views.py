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
    # Extract and sanitize teamNames array from the request
    team_names = []
    for i in range(4):  # Expecting 4 team members
        team_name = request.data.get(f"teamNames[{i}]", "").strip()
        team_names.append(team_name if team_name else "NA")

    print("Processed team names:", team_names)  # Debugging log

    # Function to sanitize input fields
    def sanitize_field(field_name, default="NA"):
        value = request.data.get(field_name, "").strip()
        return value if value else default

    # Construct the project data
    project_data = {
        "project_name": sanitize_field("title"),
        "tagline": sanitize_field("description"),
        "description": sanitize_field("problemStatement"),
        "key_features": sanitize_field("keyFeatures"),
        "domain": sanitize_field("domain"),
        "tech_stack": sanitize_field("tags"),
        "github_url": sanitize_field("githubUrl"),
        "demo_url": sanitize_field("youtubeUrl"),
        "presentation_layer": sanitize_field("presentationLayer"),
        "application_layer": sanitize_field("applicationLayer"),
        "data_layer": sanitize_field("dataLayer"),
        "methodology": sanitize_field("methodology"),
        "tools": sanitize_field("tools"),
        "api": sanitize_field("api"),
        "team_count": int(request.data.get("teamCount", 0)),
        "team_names": team_names,  # Save the constructed team names array
        "associate_project_mentor": sanitize_field("associateProjectMentor"),
        "associate_tech_mentor": sanitize_field("associateTechMentor"),
        "dt_mentor": sanitize_field("dtMentor"),
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
                    "youtube_url": project.get("youtube_url"),
                    "github_url": project.get("github_url", ""),
                    "demo_url": project.get("demo_url", ""),
                    "presentation_layer": project.get("presentation_layer", ""),
                    "application_layer": project.get("application_layer", ""),
                    "data_layer": project.get("data_layer", ""),
                    "methodology": project.get("methodology", ""),
                    "tools": project.get("tools", ""),
                    "api": project.get("api", ""),
                    "team_count": project.get("team_count", 0),
                    "team_names": project.get("team_names", []),
                    "associate_project_mentor": project.get("associate_project_mentor", ""),
                    "associate_tech_mentor": project.get("associate_tech_mentor", ""),
                    "dt_mentor": project.get("dt_mentor", ""),
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