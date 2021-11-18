from django.db import models

# Create your models here.
class Resume(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=10)
    email = models.EmailField(null=True)
