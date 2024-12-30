from django.db import models

class Project(models.Model):
    project_name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=150)
    description = models.TextField()
    key_features = models.TextField()
    domain = models.CharField(max_length=50)
    tech_stack = models.CharField(max_length=100)
    github_url = models.URLField()
    demo_url = models.URLField()
    image = models.FileField(upload_to='images/', blank=True, null=True)
    ppt = models.FileField(upload_to='ppts/', blank=True, null=True)
    product_id = models.IntegerField(unique=True)
