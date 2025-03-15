from django.contrib import admin
from import_export.admin import ExportMixin

from orders.models import Order
from users.models import UserProfile
from users.resource import UserProfileResource


# Register your models here.
@admin.register(UserProfile)
class UserProfileAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = UserProfileResource
    list_display = ('user', 'phone_number', 'address')
    search_fields = ('user__username',)

