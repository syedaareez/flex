from rest_framework import serializers
from .models import Board,Card,Task,Project


from django.contrib.auth.models import User


class UserDataRegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username", "email"]

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id",'user', 'name', 'description','members']


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["id",'user', 'title', 'description','project']

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["id", 'name', 'board']

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ["id", 'name','details','due','members', 'card']