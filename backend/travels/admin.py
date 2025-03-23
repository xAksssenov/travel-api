from django.contrib import admin
from django.utils.html import format_html

from travels.models import ExtraService, TravelPackage, Destination, Country


# Register your models here.
@admin.register(TravelPackage)
class TravelPackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'destination', 'price', 'duration', 'hyperlink_to_destination')
    list_filter = ('destination',)
    fieldsets = (
        (None, {'fields': ('name', 'destination', 'description', 'price', 'duration')}),
        ('Дополнительные услуги', {'fields': ('extra_services',)}),
    )
    filter_horizontal = ('extra_services',)

    # Hyperlink to related Destination
    def hyperlink_to_destination(self, obj):
        return format_html(f"<a href='/admin/travels/destination/{obj.destination.id}/'>{obj.destination.name}</a>")

    hyperlink_to_destination.short_description = "Destination Link"


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'view_image')
    list_filter = ('country',)
    search_fields = ('name', 'country__name')
    fieldsets = (
        (None, {'fields': ('name', 'country')}),
        ('Description & Media', {'fields': ('description', 'image')}),
    )

    # Add hyperlink to related images
    def view_image(self, obj):
        return format_html(f"<a href='{obj.image.url}' target='_blank'>View Image</a>")

    view_image.short_description = "Image"

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    

@admin.register(ExtraService)
class ExtraServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
