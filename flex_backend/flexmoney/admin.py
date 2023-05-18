from django.contrib import admin
from .models import Board,Card,Task,Project
# Register your models here.
admin.site.register(Board)
admin.site.register(Card)
admin.site.register(Task)
admin.site.register(Project)
# admin.site.register(Profile)