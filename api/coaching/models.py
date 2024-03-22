from django.db import models
from django.contrib.auth.models import AbstractUser


class TimeSlot(models.Model):
    time_slot = models.DateTimeField()
    is_available = models.BooleanField(default=True)


class User(AbstractUser):
    STUDENT = 0
    COACH = 1
    USER_TYPES = (
        (STUDENT, "Student"),
        (COACH, "Coach")
    )

    phone_number = models.CharField(max_length=12)
    user_type = models.CharField(max_length=1, choices=USER_TYPES, default=STUDENT)
    time_slots = models.ManyToManyField(TimeSlot, blank=True, related_name="coaching_timeslots")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class CoachingSession(models.Model):
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    coach = models.ForeignKey(User, on_delete=models.CASCADE, related_name="coaching_sessions")
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="student_sessions")

    def __str__(self):
        return f"Session with {self.coach} and {self.student} at {self.time_slot.time_slot}"


class CoachingSessionFeedback(models.Model):
    rating = models.IntegerField(choices=list(zip(range(1, 5), range(1, 5))), unique=True)
    note = models.CharField(max_length=500, blank=True)
    session = models.OneToOneField(CoachingSession, on_delete=models.CASCADE, related_name="session_feedback")
