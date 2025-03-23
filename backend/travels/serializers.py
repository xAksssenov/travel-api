from rest_framework import serializers

from travels.models import Country, Destination, ExtraService, TravelPackage


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

    def validate_name(self, value):
        if Country.objects.filter(name=value).exists():
            raise serializers.ValidationError("Country already exists.")
        return value

class DestinationSerializer(serializers.ModelSerializer):
    country = CountrySerializer(many=False, read_only=True)
    country_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Destination
        fields = '__all__'

    def validate_name(self, value):
        if Destination.objects.filter(name=value).exists():
            raise serializers.ValidationError("Destination already exists.")
        return value

    def create(self, validated_data):
        destination = Destination.objects.create(**validated_data)

        country_id = validated_data.get('country_id')
        country = Country.objects.get(id=country_id)
        destination.country = country

        destination.save()

        return destination

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.image = validated_data.get('image', instance.image)

        country_id = validated_data.get('country_id', instance)
        if country_id:
            country = Country.objects.get(id=country_id)
            instance.country = country
        instance.save()

        return instance
    
    
class ExtraServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraService
        fields = ['id', 'name', 'description']


class TravelPackageSerializer(serializers.ModelSerializer):
    destination = DestinationSerializer(many=False, read_only=True)
    extra_services = ExtraServiceSerializer(many=True, required=False)
    destination_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = TravelPackage
        fields = '__all__'
        
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.duration = validated_data.get('duration', instance.duration)

        destination_id = validated_data.get('destination_id', instance)
        if destination_id:
            destination = Destination.objects.get(id=destination_id)
            instance.destination = destination
        instance.save()

        return instance

    def validate_name(self, value):
        return value

    def create(self, validated_data):
        travel_package = TravelPackage.objects.create(**validated_data)

        destination_id = validated_data.get('destination_id')
        destination = Destination.objects.get(id=destination_id)
        travel_package.destination = destination

        travel_package.save()

        return travel_package

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.duration = validated_data.get('duration', instance.duration)

        destination_id = validated_data.get('destination_id', instance)
        if destination_id:
            destination = Destination.objects.get(id=destination_id)
            instance.destination = destination
        instance.save()

        return instance