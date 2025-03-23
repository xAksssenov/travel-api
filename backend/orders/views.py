from django.db.models import Q
from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from orders.filters import IsOwnerOrSuperuserFilterBackend
from orders.models import Order, Review
from orders.serializers import OrderSerializer, ReviewSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related("profile", "profile__user", "package").all()
    serializer_class = OrderSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['order_date', 'travel_date']
    search_fields = ['profile__user__first_name', 'profile__user__last_name', 'package__name']

    @action(detail=False, methods=['GET'], url_path='by-travel-date')
    def by_travel_date(self, request):
        travel_date = request.query_params.get('travel_date')
        orders = self.queryset.filter(travel_date=travel_date)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related("profile", "profile__user", "package").all()
    serializer_class = ReviewSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['rating', 'date_posted']
    search_fields = ['profile__user__first_name', 'profile__user__last_name', 'package__name', 'comment']

    def list(self, request, *args, **kwargs):
        package_id = request.query_params.get('package')
        if package_id:
            self.queryset = self.queryset.filter(package_id=package_id)
        return super().list(request, *args, **kwargs)

    @action(detail=False, methods=['GET'])
    def high_rated(self, request):
        queryset = self.queryset.filter((Q(rating__gte=4) & Q(rating__lte=6)) | ~Q(comment=''))
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data)
