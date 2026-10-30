from rest_framework.serializers import ModelSerializer
from user.models import Category, Transaction

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'