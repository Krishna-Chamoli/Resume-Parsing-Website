from django.http.response import JsonResponse
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from ResumeParser import parse
from django.conf import settings
import os
from django.core.files.storage import FileSystemStorage
from .models import Resume
import json
from sendSms import sendMessage
# Create your views here.

def home(request):
    return render(request ,"index.html")

@csrf_exempt
def parserApi(request):
    if request.method == "POST":
        try:
            file = request.FILES['file']
            path = settings.MEDIA_ROOT

            fs = FileSystemStorage()
            file = fs.save(file.name, file)
            fileurl = fs.url(file)

            file_path = path + "\\" + file
            data = parse(file_path)

            name = data['name']
            email = data['email']
            mobile = data['phone']

            resume = Resume()
            resume.name = name
            resume.email = email
            resume.mobile = mobile
            resume.save()
            data["id"] = resume.id
            return JsonResponse(data, safe=False)
        except Exception as e:
            return JsonResponse("failed", safe=False)

    elif request.method == "PUT":
        try:
            data = json.loads(request.body)
            resume = Resume.objects.get(id=data["id"])
            resume.name = data["name"]
            resume.email = data["email"]
            resume.mobile = data["mobile"]
            resume.save()
            sendMessage(data['mobile'])
            return JsonResponse("Saved Successfully", safe=False)
        except Exception as e:
            return JsonResponse("Failed", safe=False)
    
    elif request.method == "DELETE":
        try:
            data = json.loads(request.body)
            resume = Resume.objects.get(id=data["id"]['id'])
            resume.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        except Exception as e:
            return JsonResponse("Failed", safe=False)

    return HttpResponse("hello")