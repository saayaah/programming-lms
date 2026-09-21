from rest_framework import generics

from .models import Course, Lesson
from .serializers import CourseSerializer, LessonSerializer


class CourseListView(generics.ListAPIView):
    queryset = Course.objects.filter(is_published=True)
    serializer_class = CourseSerializer


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.filter(is_published=True)
    serializer_class = CourseSerializer


class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.filter(is_published=True)
    serializer_class = LessonSerializer