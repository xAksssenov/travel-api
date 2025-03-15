from django.db.models import Q
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from travels.models import TravelPackage, Destination
from travels.serializers import TravelPackageSerializer, DestinationSerializer


# Create your views here.

class TravelViewSet(viewsets.ModelViewSet):
    queryset = TravelPackage.objects.all()
    serializer_class = TravelPackageSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['destination', 'price', 'duration']
    search_fields = ['destination__name', 'description']

    @action(detail=False, methods=['GET'], url_path='by-price-and-dest')
    def by_price_and_dest(self, request):
        price = request.query_params.get('price')
        dest = request.query_params.get('dest')
        if price is None:
            return Response({'error': 'Parameter price is required'}, status=400)

        if dest is None:
            return Response({'error': 'Parameter dest is required'}, status=400)

        travels = TravelPackage.objects.filter(Q(price__lte=price) | (Q(destination_id=dest) & ~Q(price__lte=price)))
        serializer = TravelPackageSerializer(travels, many=True)
        return Response(serializer.data)


class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
