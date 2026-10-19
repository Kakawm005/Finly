from rest_framework.generics import CreateAPIView
from dashboard.serializers import UserSerializer
from user.models import User, Account
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status


class RegisterView(CreateAPIView):
    serializer_class =  UserSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                password=password
            )

            Account.objects.create(user=user)
        return Response(
            {'id': user.id, 'username': user.username},
            status=status.HTTP_201_CREATED
        )