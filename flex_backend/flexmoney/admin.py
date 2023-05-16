from django.contrib import admin
from .models import Blog,Board,Card,Task
# Register your models here.
admin.site.register(Blog)
admin.site.register(Board)
admin.site.register(Card)
admin.site.register(Task)
# admin.site.register(Profile)