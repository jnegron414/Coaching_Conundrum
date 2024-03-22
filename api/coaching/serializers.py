from django.core.exceptions import ObjectDoesNotExist

from datetime import timedelta

from django.utils import timezone
from rest_framework import serializers

from .models import TimeSlot, User, CoachingSession, CoachingSessionFeedback


class TimeSlotSerializer(serializers.ModelSerializer):
    time_slot = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = TimeSlot
        fields = ('id', 'time_slot', 'is_available')


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('full_name',)

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


# This Serializer is for when the phone number is to be displayed (a session is booked)
class SessionBookedUserSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('phone_number',)


class CoachSerializer(UserSerializer):
    time_slots = TimeSlotSerializer(many=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields
        fields += ('id', 'time_slots',)


class CoachingSessionFeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = CoachingSessionFeedback
        fields = ('rating', 'note')


class CoachingSessionSerializer(serializers.ModelSerializer):
    time_slot = TimeSlotSerializer()
    coach = SessionBookedUserSerializer()
    student = SessionBookedUserSerializer()
    show_feedback = serializers.SerializerMethodField()
    feedback = serializers.SerializerMethodField()

    class Meta:
        model = CoachingSession
        fields = ('time_slot', 'coach', 'student', 'show_feedback', 'feedback')

    def get_show_feedback(self, obj):
        # If the session has already occurred (2 hours has passed since start time)
        # then user should either see feedback or be prompted to leave feedback
        if obj.time_slot.time_slot + timedelta(hours=2) <= timezone.now():
            return True
        return False

    def get_feedback(self, obj):
        try:
            feedback = CoachingSessionFeedback.objects.get(session=obj)
            return CoachingSessionFeedbackSerializer(feedback).data
        except ObjectDoesNotExist:
            return None
