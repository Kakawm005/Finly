from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import CategorySerializer
from user.models import Category

class CategoryView(RetrieveUpdateDestroyAPIView):
    serializer_class = "CategorySerializer"