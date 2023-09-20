from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator

# Create your models here.
class User(AbstractUser):
    pass


# for tutorial testing
class Thing(models.Model):
    thing = models.CharField(blank=False, null=False, max_length=35)
    good = models.BooleanField(default=False)
    
    def __str__(self):
        return self.thing
    
    
class Song(models.Model):
    song_title = models.CharField(max_length=50, null=True)
    song_artist = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    sound_file = models.FileField(null=False, default='', upload_to="", validators=[FileExtensionValidator(allowed_extensions=['wav','mp3', 'flac', 'aiff', 'alac', 'ogg'])])
    song_art = models.ImageField(null=False, upload_to="", default='')
    date_uploaded = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.song_title
