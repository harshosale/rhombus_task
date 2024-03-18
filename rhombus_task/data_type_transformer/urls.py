from django.urls import path
from .views import csv_list, csv_process

urlpatterns = [
    path("", csv_list),
    path("process/<str:id>", csv_process),
]
