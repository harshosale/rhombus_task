from .models import CsvFiles
from rest_framework import serializers


class CsvFilesSerializers(serializers.ModelSerializer):
    class Meta:
        model = CsvFiles
        fields = ["id", "name", "data", "data_type", "status"]
