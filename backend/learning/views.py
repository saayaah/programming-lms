from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from courses.models import Course

from .models import Enrollment
from .serializers import EnrollmentSerializer


class EnrollCourseView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        course = get_object_or_404(
            Course,
            pk=kwargs["course_id"],
            is_published=True,
        )

        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course,
        )

        serializer = self.get_serializer(enrollment)

        if not created:
            return Response(
                {
                    "message": "You are already enrolled in this course.",
                    "enrollment": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "message": "Enrollment successful.",
                "enrollment": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class MyEnrollmentsView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(
            student=self.request.user
        ).select_related("course")