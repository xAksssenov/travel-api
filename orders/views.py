from django.db.models import Q
from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from orders.filters import IsOwnerOrSuperuserFilterBackend
from orders.models import Order, Review
from orders.serializers import OrderSerializer, ReviewSerializer


# Create your views here.

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['order_date', 'travel_date']
    search_fields = ['profile__first_name', 'profile__last_name', 'comment']

    @action(detail=False, methods=['GET'], url_path='by-travel-date')
    def by_travel_date(self, request):
        travel_date = request.query_params.get('travel_date')
        orders = Order.objects.filter(travel_date=travel_date)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [IsOwnerOrSuperuserFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['rating', 'date_posted']
    search_fields = ['profile__first_name', 'profile__last_name', 'comment']

    @action(detail=False, methods=['GET'])
    def high_rated(self, request):
        queryset = Review.objects.filter((Q(rating__gte=4) & Q(rating__lte=6)) | ~Q(comment=''))
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data)
