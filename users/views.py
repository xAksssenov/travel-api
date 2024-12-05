from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from users.models import UserProfile
from users.serializers import UserProfileSerializer


# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['address', 'phone_number']


    @action(detail=True, methods=["POST"], url_path="change-phone-number")
    def change_phone_number(self, request, pk=None):
        user = self.get_object()
        phone_number = request.data.get("phone_number")
        user.phone_number = phone_number
        user.save()
        return Response({"message": "Phone number updated successfully."})