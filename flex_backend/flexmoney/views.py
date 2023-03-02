from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Blog
from .serializers import BlogDataSerializer,UserDataRegisteredSerializer


from django.contrib.auth.models import User


class UserApiView(APIView):

    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserDataRegisteredSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request,*args,**kwargs):
        username=request.data.get('name')
        password=request.data.get('password')
        email=request.data.get('email')

        if(username and password and email):
            user = User.objects.create_user(username, email, password)
            user.save()

            return Response("User created successfully!!")
        else:
            return Response("Enter all fields!")

class BlogListApiView(APIView):

    def get(self, request, *args, **kwargs):
        blogs = Blog.objects.all()
        serializer = BlogDataSerializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            'title': request.data.get('title'), 
            'content': request.data.get('content'), 
            'author': request.data.get('author'),
        }
        serializer = BlogDataSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


