from django.shortcuts import get_object_or_404, render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken


from .models import Blog,Board,Card,Task
from .serializers import BlogDataSerializer,UserDataRegisteredSerializer,BoardSerializer,CardSerializer,TaskSerializer


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
    # permission_classes = (permissions.IsAuthenticated,)
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
        # print(connection.queries[-1]," this is the user")
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
    


    # BOARDS

class UserBoards(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        boards=Board.objects.filter(user=self.request.user)
        serializer=BoardSerializer(boards,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'title': request.data.get('title'), 
            'description': request.data.get('description'), 
            'user':self.request.user.id
        }
        serializer = BoardSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        BOARD=Board.objects.get(id=request.data.get('board_id'))
        BOARD.delete()
        return Response("BOARD deleted sucessfully")


class BoardCard(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        cards=Card.objects.filter(board=self.kwargs["board_id"])
        serializer=CardSerializer(cards,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'), 
            'board':self.kwargs["board_id"]
        }
        serializer = CardSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        CARD=Card.objects.get(id=request.data.get('card_id'))
        CARD.delete()
        return Response("CARD deleted sucessfully")
    
class CardTask(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        board = get_object_or_404(Board, id=self.kwargs["board_id"])
        tasks = Task.objects.filter(card__board=board)
        serializer=TaskSerializer(tasks,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'), 
            'details': request.data.get('details'), 
            'card': request.data.get('card_id'), 
        }
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def delete(self, request, *args, **kwargs):
    #     CARD=Card.objects.get(id=request.data.get('card_id'))
    #     CARD.delete()
    #     return Response("CARD deleted sucessfully")

