from django.shortcuts import render
from rest_framework import viewsets

from orders.models import Order
from orders.serializers import OrderSerializer


# Create your views here.

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
