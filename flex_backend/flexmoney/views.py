from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken


from .models import Blog
from .serializers import BlogDataSerializer,UserDataRegisteredSerializer


from django.contrib.auth.models import User

from django.db import connection


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
        

# User Logout

class UserLogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("Logged Out Successfully")
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class UserDetailsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        user=User.objects.filter(id=request.data.get("id"))
        print(connection.queries[-1]," this is the user")
        if(user):
          serializer = UserDataRegisteredSerializer(user,many=True)
          return Response(serializer.data, status=status.HTTP_200_OK)      
        return Response("Not a valid user")

        

class BlogListApiView(APIView):

    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
    
    def delete(self, request, *args, **kwargs):
        blog=Blog.objects.get(id=request.data.get('blog_id'))
        blog.delete()
        return Response("BLog deleted sucessfully")


