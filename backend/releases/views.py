from rest_framework.generics import RetrieveUpdateDestroyAPIView
from releases.serializers import ReleasesSerializer
from user.models import Transaction
from django.utils import timezone
from rest_framework.response import Response

class ReleasesView(RetrieveUpdateDestroyAPIView):
    serializer_class = ReleasesSerializer
    queryset = Transaction.objects.all()

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        ano_atual = timezone.localdate().year
        transacoes = Transaction.objects.filter(account_id=serializer.data["id"], date_time_create__year=ano_atual)

        receitas_despesas = {}
        receitas_despesas["movement"] = {"total_expenses" : 0, "total_despenses": 0}
        for transacao in transacoes:
            if transacao.category.type == "RE":
                receitas_despesas["movement"]["total_expenses"] += transacao.value
            elif transacao.category.type == "DE":
                receitas_despesas["movement"]["total_despenses"] += transacao.value
        print(transacoes)
        return Response({
            'transacoes': receitas_despesas
        })