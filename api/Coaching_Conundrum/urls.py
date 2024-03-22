"""Coaching_Conundrum URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from coaching.views import CoachViewSet, TimeSlotViewSet, CoachingSessionFeedbackViewSet, CoachingSessionViewSet

router = DefaultRouter()
router.register(r'coaches', CoachViewSet, basename='coaches')
router.register(r'time_slots', TimeSlotViewSet, basename='time_slots')
router.register(r'coaching_session_feedback', CoachingSessionFeedbackViewSet, basename='coaching_session_feedback')
router.register(r'coaching_session', CoachingSessionViewSet, basename='coaching_sessions')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
