from rest_framework import serializers
from .models import *

# class TodoSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = TODO
#         fields = ('id', 'title', 'description', 'completed')



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # fields = ['username', 'first_name', 'last_name', 'email_address', 'groups']
        
        
class ThingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thing
        fields = "__all__"
        
        
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"
        
        
# hyperlinked serializer for user model
class HyperUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        # for a hyperlinked model serializer the first parameter must be a url
            # It includes a url field, using HyperlinkedIdentityField.
        fields = ("url", "id", "username")
