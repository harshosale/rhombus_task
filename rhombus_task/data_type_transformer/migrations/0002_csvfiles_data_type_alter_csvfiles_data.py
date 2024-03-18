# Generated by Django 4.2.11 on 2024-03-09 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_type_transformer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='csvfiles',
            name='data_type',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='csvfiles',
            name='data',
            field=models.FileField(upload_to='rhombus_task/uploads/csv/'),
        ),
    ]