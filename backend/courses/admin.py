from django.contrib import admin
from .models import Course, Module, Lesson

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "difficulty",
        "is_published",
        "created_at",
    )

    search_fields = ("title", "description")

    list_filter = ("difficulty", "is_published")


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "course",
        "order",
        "created_at",
    )

    search_fields = ("title", "course__title")

    list_filter = ("course",)

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "module",
        "order",
        "is_published",
        "created_at",
    )

    search_fields = (
        "title",
        "content",
        "module__title",
    )

    list_filter = (
        "is_published",
        "module",
    )

    ordering = ("module", "order")