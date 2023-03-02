

from django.urls import path, include
from .views import (
    BlogListApiView,UserApiView
)

urlpatterns = [
    path('blogs', BlogListApiView.as_view()),
    path("createuser",UserApiView.as_view()),
]
