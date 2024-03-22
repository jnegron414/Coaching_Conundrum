from django.db.models import Q

from rest_framework import viewsets

from coaching.models import User, TimeSlot, CoachingSessionFeedback, CoachingSession
from coaching.serializers import CoachSerializer, TimeSlotSerializer, CoachingSessionFeedbackSerializer, \
    CoachingSessionSerializer
from rest_framework.response import Response


class CoachViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(user_type=User.COACH)
    serializer_class = CoachSerializer


class TimeSlotViewSet(viewsets.ModelViewSet):
    def create(self, request):
        # Create the timeslot in the DB if it doesn't exist otherwise return it
        time_slot_data = request.data
        time_slot, _ = TimeSlot.objects.get_or_create(**time_slot_data)

        print(f"TIME SLOT {time_slot}")
        # Add the timeslot to the coaches slots
        request.user.time_slots.add(time_slot)
        return Response(TimeSlotSerializer(time_slot).data)


class CoachingSessionFeedbackViewSet(viewsets.ModelViewSet):
    def create(self, request):
        feedback_data = request.data
        feedback = CoachingSessionFeedback.objects.create(**feedback_data)
        return Response(CoachingSessionFeedbackSerializer(feedback).data)


class CoachingSessionViewSet(viewsets.ModelViewSet):
    queryset = CoachingSession.objects.none()
    serializer_class = CoachingSessionSerializer

    def get_queryset(self):
        queryset = CoachingSession.objects.filter(Q(coach=self.request.user) | Q(student=self.request.user))
        return queryset

    def create(self, request):
        coaching_session_data = request.data
        coaching_session = CoachingSession.objects.create(**coaching_session_data, student=request.user)

        # Once a time slot is selected, that time slot is no longer available
        coaching_session.time_slot.is_available = False
        coaching_session.time_slot.save()
        return Response(CoachingSessionSerializer(coaching_session).data)


