from rest_framework import serializers
from .models import Blog,Board,Card,Task


from django.contrib.auth.models import User


class UserDataRegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username", "email"]


class BlogDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["title", "content", "author"]


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["id",'user', 'title', 'description']

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["id", 'name', 'board']

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ["id", 'name','details','due','members', 'card']