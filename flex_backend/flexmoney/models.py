from django.db import models

# Create your models here.
# from django.contrib.auth.models import User

class Blog(models.Model):
    title= models.CharField(max_length = 180)
    content= models.CharField(max_length = 580)
    # author=models.ForeignKey(UserDetails, on_delete = models.CASCADE, blank = True, null = True)
    author=models.CharField(max_length = 18)

    def __str__(self):
        return self.title