from rest_framework.serializers import ModelSerializer
from user.models import Account, Transaction, User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'