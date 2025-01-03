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
import json

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
def register_user(request):
    """
    Registers a new user and saves details in the appropriate collection
    ('staff' for admin, 'super_admin' for superadmin).
    """
    try:
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role")  # Expecting 'admin' or 'superadmin'

        # Validate inputs
        if not name or not email or not password or not role:
            return Response({"error": "Name, Email, Password, and Role are required."}, status=400)

        if role not in ["admin", "superadmin"]:
            return Response({"error": "Invalid role. Role must be 'admin' or 'superadmin'."}, status=400)

        # Check if the user already exists in either collection
        existing_user_in_staff = db["staff"].find_one({"email": email})
        existing_user_in_superadmin = db["super_admin"].find_one({"email": email})

        if existing_user_in_staff or existing_user_in_superadmin:
            return Response({"error": "User already exists."}, status=400)

        # Generate a new ObjectId for staff_id and convert it to string
        staff_id = str(ObjectId())

        # Prepare user data
        user_data = {
            "name": name,
            "email": email,
            "password": password,  # Note: Store hashed passwords in production
            "staff_id": staff_id,
            "role": role
        }

        # Save user to the appropriate collection based on role
        if role == "admin":
            db["staff"].insert_one(user_data)
        elif role == "superadmin":
            db["super_admin"].insert_one(user_data)

        return Response({
            "message": "User registered successfully.",
            "staff_id": staff_id,
            "role": role
        }, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def login_user(request):
    """
    Logs in an existing user by checking details in 'staff' or 'super_admin' collection.
    """
    try:
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and Password are required."}, status=400)

        # Attempt to find user in 'staff' collection
        user = db["staff"].find_one({"email": email, "password": password})
        
        # If not found in 'staff', attempt to find in 'super_admin' collection
        if not user:
            user = db["super_admin"].find_one({"email": email, "password": password})
        
        # If still not found, return error
        if not user:
            return Response({"error": "Invalid email or password."}, status=401)

        # Respond with success, user name, role, and staff_id
        return Response({
            "message": f"Welcome, {user['name']}! Login successful.",
            "staff_id": user['staff_id'],
            "user_name": user['name'],
            "role": user.get('role', 'N/A')  # Include the user's role in the response
        }, status=200)

    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(['GET'])
def get_staff_data(request):
    """
    Fetches all staff data from the 'staff' collection, including college and department details.
    """
    try:
        staff_data = list(db["staff"].find({}, {"_id": 0}))  # Fetch all fields except ObjectId
        if not staff_data:
            return Response({"error": "No staff data found."}, status=404)
        
        # Process staff data to include formatted response
        processed_staff_data = [
            {
                "name": staff.get("name", "N/A"),
                "email": staff.get("email", "N/A"),
                "staff_id": staff.get("staff_id", "N/A"),
                "role": staff.get("role", "N/A"),
                "college": staff.get("college", "N/A"),
                "department": staff.get("department", "N/A")
            }
            for staff in staff_data
        ]

        return Response({"staff_data": processed_staff_data}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['POST'])
def save_project(request):
    # Extract and sanitize general project fields
    project_data = {
        "staff_id" : sanitize_field(request.data.get("staff_id")),
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
        "github_url": sanitize_field(request.data.get("githubUrl")),
        "demo_url": sanitize_field(request.data.get("youtubeUrl")),
        "ppt_url": sanitize_field(request.data.get("ppt")),
        "tags": request.data.getlist("tags[]"),  # Correctly fetch tags as a list
        "domains": request.data.getlist("domains[]"),
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

    # Process mentors' details
    mentors = {
        "associate_project_mentor": {
            "name": sanitize_field(request.data.get("associateProjectMentor")),
            "image": (
                request.FILES.get("associateProjectMentorImage").read()
                if request.FILES.get("associateProjectMentorImage")
                else None
            ),
        },
        "associate_tech_mentor": {
            "name": sanitize_field(request.data.get("associateTechMentor")),
            "image": (
                request.FILES.get("associateTechMentorImage").read()
                if request.FILES.get("associateTechMentorImage")
                else None
            ),
        },
        "dt_mentor": {
            "name": sanitize_field(request.data.get("dtMentor")),
            "image": (
                request.FILES.get("dtMentorImage").read()
                if request.FILES.get("dtMentorImage")
                else None
            ),
        },
    }
    project_data["mentors"] = mentors

    # Handle project image
    image_file = request.FILES.get("image")
    project_data["image"] = image_file.read() if image_file else None

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
                    "title": project.get("title", ""),
                    "description": project.get("description", ""),
                    "college": project.get("college", ""),
                    "problem_statement": project.get("problem_statement", ""),
                    "key_features": project.get("key_features", ""),
                    "scope": project.get("scope", ""),
                    "presentation_layer": project.get("presentation_layer", ""),
                    "application_layer": project.get("application_layer", ""),
                    "data_layer": project.get("data_layer", ""),
                    "methodology": project.get("methodology", ""),
                    "tools": project.get("tools", ""),
                    "api": project.get("api", ""),
                    "team_count": project.get("team_count", 0),
                    "github_url": project.get("github_url", ""),
                    "demo_url": project.get("demo_url", ""),
                    "ppt_url": project.get("ppt_url", ""),
                    "tags": project.get("tags", []),
                    "domains": project.get("domains", []),
                    "product_id": project.get("product_id", ""),
                    "team_members": [],
                    "mentors": {
                        "associate_project_mentor": {},
                        "associate_tech_mentor": {},
                        "dt_mentor": {},
                    },
                }

                # Process team members
                if "team_members" in project:
                    for member in project["team_members"]:
                        project_data["team_members"].append({
                            "name": member.get("name", ""),
                            "image": {
                                "content_type": "image/png",  # Ensure content type is included
                                "data": base64.b64encode(member["image"]).decode("utf-8")
                                if member.get("image")
                                else None,
                            },
                        })

                # Process mentors
                mentors = project.get("mentors", {})
                for key, mentor in mentors.items():
                    if mentor:
                        project_data["mentors"][key] = {
                            "name": mentor.get("name", ""),
                            "image": {
                                "content_type": "image/png",  # Ensure content type is included
                                "data": base64.b64encode(mentor["image"]).decode("utf-8")
                                if mentor.get("image")
                                else None,
                            },
                        }

                # Process project image
                if "image" in project and project["image"]:
                    project_data["image"] = {
                        "content_type": "image/png",  # Ensure content type is included
                        "data": base64.b64encode(project["image"]).decode("utf-8"),
                    }

                project_list.append(project_data)

            except Exception as e:
                print(f"Error processing project: {project.get('_id', 'unknown')} - {str(e)}")
                continue

        return Response(project_list, status=200)

    except Exception as e:
        print(f"Error fetching projects: {str(e)}")
        return Response({"error": "Could not fetch projects"}, status=500)
    
@api_view(['GET'])
def get_projects_by_staff_id(request):
    try:
        # Extract staff_id from the request parameters
        staff_id = request.GET.get('staff_id', None)
        if not staff_id:
            return Response({"error": "staff_id is required"}, status=400)

        # Filter projects by staff_id
        projects = collection.find({"staff_id": staff_id})
        project_list = []

        for project in projects:
            try:
                project_data = {
                    "title": project.get("title", ""),
                    "description": project.get("description", ""),
                    "college": project.get("college", ""),
                    "problem_statement": project.get("problem_statement", ""),
                    "key_features": project.get("key_features", ""),
                    "scope": project.get("scope", ""),
                    "presentation_layer": project.get("presentation_layer", ""),
                    "application_layer": project.get("application_layer", ""),
                    "data_layer": project.get("data_layer", ""),
                    "methodology": project.get("methodology", ""),
                    "tools": project.get("tools", ""),
                    "api": project.get("api", ""),
                    "team_count": project.get("team_count", 0),
                    "github_url": project.get("github_url", ""),
                    "demo_url": project.get("demo_url", ""),
                    "ppt_url": project.get("ppt_url", ""),
                    "tags": project.get("tags", []),
                    "domains": project.get("domains", []),
                    "product_id": project.get("product_id", ""),
                    "team_members": [],
                    "mentors": {
                        "associate_project_mentor": {},
                        "associate_tech_mentor": {},
                        "dt_mentor": {},
                    },
                }

                # Process team members
                if "team_members" in project:
                    for member in project["team_members"]:
                        project_data["team_members"].append({
                            "name": member.get("name", ""),
                            "image": {
                                "content_type": "image/png",  # Ensure content type is included
                                "data": base64.b64encode(member["image"]).decode("utf-8")
                                if member.get("image")
                                else None,
                            },
                        })

                # Process mentors
                mentors = project.get("mentors", {})
                for key, mentor in mentors.items():
                    if mentor:
                        project_data["mentors"][key] = {
                            "name": mentor.get("name", ""),
                            "image": {
                                "content_type": "image/png",  # Ensure content type is included
                                "data": base64.b64encode(mentor["image"]).decode("utf-8")
                                if mentor.get("image")
                                else None,
                            },
                        }

                # Process project image
                if "image" in project and project["image"]:
                    project_data["image"] = {
                        "content_type": "image/png",  # Ensure content type is included
                        "data": base64.b64encode(project["image"]).decode("utf-8"),
                    }

                project_list.append(project_data)

            except Exception as e:
                print(f"Error processing project: {project.get('_id', 'unknown')} - {str(e)}")
                continue

        return Response(project_list, status=200)

    except Exception as e:
        print(f"Error fetching projects by staff_id: {str(e)}")
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
    
@csrf_exempt
@api_view(['PUT'])
def edit_project(request, product_id):
    """
    Edit project details without changing the existing images if not updated.
    """
    try:
        # Parse the JSON body once
        request_data = json.loads(request.body.decode('utf-8'))

        # Fetch the existing project by product_id
        print(f"Triggered edit_project for product_id: {product_id}")
        project = collection.find_one({"product_id": int(product_id)})
        if not project:
            return JsonResponse({"error": "Project not found."}, status=404)

        # Update non-image fields
        updated_fields = {
            "title": request_data.get("title", project.get("title")),
            "description": request_data.get("description", project.get("description")),
            "problem_statement": request_data.get("problem_statement", project.get("problem_statement")),
            "key_features": request_data.get("key_features", project.get("key_features")),
            "presentation_layer": request_data.get("presentation_layer", project.get("presentation_layer")),
            "application_layer": request_data.get("application_layer", project.get("application_layer")),
            "data_layer": request_data.get("data_layer", project.get("data_layer")),
            "github_url": request_data.get("github_url", project.get("github_url")),
            "demo_url": request_data.get("demo_url", project.get("demo_url")),
            "ppt_url": request_data.get("ppt_url", project.get("ppt_url")),
        }

        # Retain existing image if no new image is uploaded
        if not request.FILES.get("image"):
            updated_fields["image"] = project.get("image")  # Retain existing image
        else:
            updated_fields["image"] = request.FILES["image"].read()  # Update with new image

        # Process team members (if provided in request)
        team_members = request_data.get("team_members", None)
        if team_members:
            updated_team_members = []
            for i, member in enumerate(team_members):
                existing_member = project.get("team_members", [])[i] if i < len(project.get("team_members", [])) else {}
                updated_team_members.append({
                    "name": member.get("name", existing_member.get("name")),
                    "image": (
                        request.FILES.get(f"team_members[{i}][image]").read()
                        if request.FILES.get(f"team_members[{i}][image]")
                        else existing_member.get("image")
                    )
                })
            updated_fields["team_members"] = updated_team_members

        # Process mentors (if provided in request)
        mentors = request_data.get("mentors", None)
        if mentors:
            updated_mentors = project.get("mentors", {})
            for key, mentor in mentors.items():
                if "name" in mentor:
                    updated_mentors[key]["name"] = mentor["name"]
                if "image" in mentor and request.FILES.get(f"{key}_image"):
                    updated_mentors[key]["image"] = request.FILES[f"{key}_image"].read()
            updated_fields["mentors"] = updated_mentors

        # Update project in MongoDB
        collection.update_one({"product_id": int(product_id)}, {"$set": updated_fields})

        return JsonResponse({"message": "Project updated successfully."}, status=200)

    except Exception as e:
        print(f"Error in edit_project: {e}")
        return JsonResponse({"error": str(e)}, status=500)
    
@csrf_exempt
def delete_project(request, product_id):
    """
    Deletes a project based on the given product_id.
    """
    if request.method == "DELETE":
        try:
            # Find and delete the project
            result = collection.delete_one({"product_id": int(product_id)})

            if result.deleted_count == 1:
                return JsonResponse({"message": "Project deleted successfully."}, status=200)
            else:
                return JsonResponse({"error": "Project not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid HTTP method. Only DELETE is allowed."}, status=405)