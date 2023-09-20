from django.shortcuts import render, HttpResponse
from django.http import JsonResponse

from rest_framework import viewsets, status
    #gives access to @api_view decorator
from rest_framework.decorators import api_view
    # access to Django REST Framework page with JSON data
from rest_framework.response import Response

from .serializers import *

from .models import *
import json


# (from Digital Ocean Tutorial)
# from .serializers import TodoSerializer

# Create your views here.
# class TODOView(viewsets.ModelViewSet):
    # serializer_class = TodoSerializer
    # queryset = TODO.objects.all()
    
     
@api_view(['GET'])
def apiRoutes(request):
    
    # api_urls = {
    #     'List': '/user-list/',
    #     'Detail View': '/user-detail/<str:pk>/',
    #     'Create': '/user-create/',
    #     'Update': '/user-update/<str:pk>/',
    #     'Delete': '/user-delete/<str:pk>/',
    # }
    api_urls = {
        'List': '/thing-list/',
        'Detail View': '/thing-detail/<str:pk>/',
        'Create': '/thing-create/',
        'Update': '/thing-update/<str:pk>/',
        'Delete': '/thing-delete/<str:pk>/',
    }
    
    return Response(api_urls)


@api_view(['GET'])
def thingList(request):
    # getting the django model instances
    things = Thing.objects.all().order_by('id')
    # then putting those models into the correct serializer for that model + amount
    serializer = ThingSerializer(things, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def thingDetail(request, pk):
    thing = Thing.objects.get(id=pk)
    serializer = ThingSerializer(thing, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def thingCreate(request):
    # parse the request.data
    serializer = ThingSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        return Response(serializer.errors)
    


@api_view(['POST'])
def thingUpdate(request, pk):
    thing = Thing.objects.get(id=pk)
    serializer = ThingSerializer(instance=thing,data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)


@api_view(['DELETE'])
def thingDelete(request, pk):
    thing = Thing.objects.get(id=pk)
    thing.delete()
    return Response("Item deleted!")


@api_view(['POST'])
def songCreate(request):
    
    serializer = SongSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        return Response(serializer.errors)
    

@api_view(['GET'])
def songList(request):
    
    songs = Song.objects.all().order_by('id')
    print(songs)
    serializer = SongSerializer(songs, many=True)
    
    return Response(serializer.data)


#-------------------- Testing out hyper linked model serializer viewsets -------------------------------#

# class view for hyper model serializer
class HyperViewSet(viewsets.ModelViewSet):
    serializer_class = HyperUserSerializer
    queryset = User.objects.all()


class HyperViewDetail(viewsets.ModelViewSet):
    serializer_class = HyperUserSerializer
    queryset = User.objects.all()
    
    def retrieve(self, request, pk=None):
        try:
            user = self.queryset.get(id=pk)
            serializer = self.serializer_class(user, context={'request': request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)