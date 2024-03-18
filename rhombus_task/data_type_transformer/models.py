from django.db import models

# Create your models here.


class CsvFiles(models.Model):
    name = models.CharField(max_length=200)
    data = models.FileField(upload_to="rhombus_task/uploads/csv/")
    data_type = models.JSONField(null=True)
    status = models.CharField(max_length=20, null=True)
