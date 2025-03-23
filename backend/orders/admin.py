from django.contrib import admin

from orders.models import Order, Review


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('profile', 'package', 'order_date', 'travel_date', 'num_people')
    list_filter = ('order_date', 'travel_date')
    search_fields = ('profile__user__username', 'package__name')
    readonly_fields = ('order_date',)
    date_hierarchy = 'travel_date'
    raw_id_fields = ('profile', 'package')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('profile', 'package', 'rating', 'short_comment')
    list_filter = ('rating', 'date_posted')
    date_hierarchy = 'date_posted'

    def short_comment(self, obj):
        return obj.comment[:50] + "..." if len(obj.comment) > 50 else obj.comment

    short_comment.short_description = "Comment Summary"
