# Generated by Django 4.1.11 on 2023-09-17 23:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0003_alter_song_date_uploaded'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='date_uploaded',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 17, 23, 10, 10, 846111, tzinfo=datetime.timezone.utc)),
        ),
    ]