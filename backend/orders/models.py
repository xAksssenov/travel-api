from django.contrib.auth.models import User
from django.db import models

from travels.models import TravelPackage
from users.models import UserProfile


class Order(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='orders')
    package = models.ForeignKey(TravelPackage, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    travel_date = models.DateField()
    num_people = models.PositiveIntegerField()
    url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Заказы"
        verbose_name = "Заказ"

    def __str__(self):
        return f"Order by {self.profile.user.username} for {self.package.name}"


class Review(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='reviews')
    package = models.ForeignKey(TravelPackage, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Отзывы"
        verbose_name = "Отзыв"

    def __str__(self):
        return f"Review by {self.profile.user.username} for {self.package.name}"
