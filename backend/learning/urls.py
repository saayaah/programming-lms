from django.urls import path

from .views import EnrollCourseView, MyEnrollmentsView


urlpatterns = [
    path(
        "courses/<int:course_id>/enroll/",
        EnrollCourseView.as_view(),
        name="course-enroll",
    ),
    path(
        "enrollments/",
        MyEnrollmentsView.as_view(),
        name="my-enrollments",
    ),
]