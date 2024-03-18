from .serializers import CsvFilesSerializers
from .models import CsvFiles
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .helpers.csv_processors import process_csv
import os


@api_view(["GET", "POST"])
def csv_list(request):
    if request.method == "GET":
        return Response(
            {"csv": CsvFilesSerializers(CsvFiles.objects.all(), many=True).data},
            status=status.HTTP_200_OK,
        )

    elif request.method == "POST":
        serializer = CsvFilesSerializers(data=request.data)
        serializer.initial_data["data_type"] = {}
        serializer.initial_data["status"] = "uploaded"
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
    return Response(
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["POST", "PUT", "DELETE"])
def csv_process(request, id):
    if request.method == "POST":
        try:
            csv = CsvFiles.objects.get(pk=id)
            csv.data_type = process_csv(csv.data)
            csv.status = "processed"
            csv.save()
            return Response(
                status=status.HTTP_202_ACCEPTED,
            )
        except:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
            )
    elif request.method == "PUT":
        try:
            csv = CsvFiles.objects.get(pk=id)
            csv.data_type = request.data.get("data_type")
            csv.status = "customized"
            csv.save()
            return Response(
                status=status.HTTP_202_ACCEPTED,
            )
        except:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
            )
    elif request.method == "DELETE":
        try:
            csv = CsvFiles.objects.get(pk=id)
            os.remove(str(csv.data))
            csv.delete()
            return Response(
                status=status.HTTP_204_NO_CONTENT,
            )
        except:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
            )
    return Response(
        status=status.HTTP_400_BAD_REQUEST,
    )
