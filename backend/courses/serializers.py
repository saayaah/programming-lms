from rest_framework import serializers
from .models import Course, Module, Lesson


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "content",
            "video_url",
            "order",
            "is_published",
        ]


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = [
            "id",
            "title",
            "description",
            "order",
            "lessons",
        ]


class CourseSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "difficulty",
            "is_published",
            "created_at",
            "updated_at",
            "modules",
        ]