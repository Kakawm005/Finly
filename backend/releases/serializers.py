from rest_framework.serializers import ModelSerializer
from user.models import Transaction

class ReleasesSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'