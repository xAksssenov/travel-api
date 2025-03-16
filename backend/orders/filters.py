from django.db.models import QuerySet
from rest_framework.filters import BaseFilterBackend



class IsOwnerOrSuperuserFilterBackend(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        if request.user.is_superuser:
            return queryset

        return queryset.filter(profile__user=request.user.id)