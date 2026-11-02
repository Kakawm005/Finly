from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import CategorySerializer
from user.models import Category
from rest_framework.response import Response

class CategoryView(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def retrieve(self, request, *args, **kwargs):
        category = self.get_object()
        categorias_despensas = Category.objects.filter(account_id=category.account_id, type="DE").count()
        categorias_receitas = Category.objects.filter(account_id=category.account_id, type="RE").count()

        return Response({
            "categorias_despensas" : categorias_despensas,
            "categorias_receitas": categorias_receitas,
            "total_categorias": categorias_despensas + categorias_receitas
        })