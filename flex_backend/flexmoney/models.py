from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     bio = models.TextField(max_length=500, blank=True)
#     profilePic=models.ImageField(blank=True)
#     followers=models.IntegerField(blank=True)
#     following=models.IntegerField(blank=True)
#     posts=models.IntegerField(blank=True)

#     def __str__(self):
#         return self.profilePic
    
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

# Basically we are hooking the create_user_profile and save_user_profile methods to the User model, whenever a save event occurs. This kind of signal is called post_save.

# In Views.py

# def update_profile(request, user_id):
    # user = User.objects.get(pk=user_id)
    # user.profile.bio = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...'
    # user.save()

    

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True,null=True)
    members = models.ManyToManyField(User, related_name='projects',blank=True) 

    def __str__(self):
        return self.name   

class Board(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=550)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.title    
    
class Card(models.Model):
    name = models.CharField(max_length=255)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='cards')

    def __str__(self):
        return self.name
    
class Task(models.Model):
    name = models.CharField(max_length=255)
    details = models.TextField(blank=True,null=True)
    due = models.DateTimeField(blank=True,null=True)
    members = models.ManyToManyField(User, blank=True, related_name='task_members')
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.name