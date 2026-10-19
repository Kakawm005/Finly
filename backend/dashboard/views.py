from rest_framework.generics import RetrieveAPIView
from dashboard.serializers import AccountSerializer
from user.models import Account, Transaction

class DashboardView(RetrieveAPIView):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def get(self, request, *args, **kwargs):
        Transaction.objects.filter()
        return super().get(request, *args, **kwargs)