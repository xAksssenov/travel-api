from import_export import fields
from import_export.resources import ModelResource

from users.models import UserProfile


class UserProfileResource(ModelResource):
    class Meta:
        model = UserProfile
        queryset = UserProfile.objects.all()
        fields = ('id', 'address', 'user', 'phone_number')
        export_order = ('id', 'address', 'user', 'phone_number')

    def get_export_queryset(self, queryset):
        return queryset.filter(user__is_active=True)

    def get_user(self, user_profile):
        return user_profile.user.username

    def dehydrate_phone_number(self, user_profile):
        return f"+{user_profile.phone_number}"
