# Generated by Django 4.1.11 on 2023-09-21 18:43

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0010_alter_song_song_art_alter_song_sound_file'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='song',
            options={'verbose_name_plural': 'Songs'},
        ),
        migrations.AlterField(
            model_name='song',
            name='song_art',
            field=models.ImageField(upload_to=''),
        ),
        migrations.AlterField(
            model_name='song',
            name='sound_file',
            field=models.FileField(upload_to='', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['wav', 'mp3', 'flac', 'aiff', 'alac', 'ogg'])]),
        ),
    ]
