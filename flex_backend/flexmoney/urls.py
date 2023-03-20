

from django.urls import path, include
from .views import (
    BlogListApiView,UserApiView,UserLogoutView,UserDetailsView
)



urlpatterns = [
    path('blogs', BlogListApiView.as_view()),
    path("createuser",UserApiView.as_view()),

    path("userdetails",UserDetailsView.as_view()),

    path('logout/', UserLogoutView.as_view(), name='token_obtain_pair'),
]
