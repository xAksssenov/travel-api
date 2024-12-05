from rest_framework import serializers

from orders.models import Order, Review
from travels.models import TravelPackage
from users.models import UserProfile
from users.serializers import UserProfileSerializer
from travels.serializers import TravelPackageSerializer


class OrderSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    profile_id = serializers.IntegerField(write_only=True)

    travel_package = TravelPackageSerializer(many=False, read_only=True)
    travel_package_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def validate(self, data):
        if data['num_people'] <= 0:
            raise serializers.ValidationError("Number of people must be greater than 0.")
        return data

    def create(self, validated_data):
        profile_id = validated_data.pop('profile_id')
        profile = UserProfile.objects.get(id=profile_id)

        travel_package_id = validated_data.pop('travel_package_id')
        travel_package = TravelPackage.objects.get(id=travel_package_id)

        order = Order.objects.create(profile=profile, travel_package=travel_package, **validated_data)
        return order

    def update(self, instance, validated_data):
        instance.package = validated_data.get('package', instance.package)
        instance.order_date = validated_data.get('order_date', instance.order_date)
        instance.travel_date = validated_data.get('travel_date', instance.travel_date)
        instance.num_people = validated_data.get('num_people', instance.num_people)

        profile_id = validated_data.pop('profile_id', None)

        if profile_id:
            profile = UserProfile.objects.get(id=profile_id)
            instance.profile = profile

        travel_package_id = validated_data.pop('travel_package_id', None)
        if travel_package_id:
            travel_package = TravelPackage.objects.get(id=travel_package_id)
            instance.travel_package = travel_package

        instance.save()
        return instance


class ReviewSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    profile_id = serializers.IntegerField(write_only=True)

    travel_package = TravelPackageSerializer(many=False, read_only=True)
    travel_package_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def validate(self, data):
        if data['rating'] < 1 or data['rating'] > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return data

    def create(self, validated_data):
        profile_id = validated_data.pop('profile_id')
        profile = UserProfile.objects.get(id=profile_id)

        travel_package_id = validated_data.pop('travel_package_id')
        travel_package = TravelPackage.objects.get(id=travel_package_id)

        review = Review.objects.create(profile=profile, travel_package=travel_package, **validated_data)
        return review

    def update(self, instance, validated_data):
        instance.rating = validated_data.get('rating', instance.rating)
        instance.comment = validated_data.get('comment', instance.comment)

        profile_id = validated_data.pop('profile_id', None)

        if profile_id:
            profile = UserProfile.objects.get(id=profile_id)
            instance.profile = profile

        travel_package_id = validated_data.pop('travel_package_id', None)
        if travel_package_id:
            travel_package = TravelPackage.objects.get(id=travel_package_id)
            instance.travel_package = travel_package

        instance.save()
        return instance
