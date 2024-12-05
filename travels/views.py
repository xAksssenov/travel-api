from django.shortcuts import render
from rest_framework import viewsets

from travels.models import TravelPackage, Destination
from travels.serializers import TravelPackageSerializer, DestinationSerializer


# Create your views here.

class TravelViewSet(viewsets.ModelViewSet):
    queryset = TravelPackage.objects.all()
    serializer_class = TravelPackageSerializer

class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer