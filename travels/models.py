from django.db import models


# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=50)


class Destination(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to='destinations/')

    def __str__(self):
        return self.name



class TravelPackage(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='packages')
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.PositiveIntegerField(help_text="Duration in days")

    def __str__(self):
        return f"{self.name} - {self.destination.name}"
