from rest_framework import serializers
from .models import Blog


from django.contrib.auth.models import User


class UserDataRegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]

class BlogDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["title", "content", "author"]