from rest_framework.generics import RetrieveAPIView
from dashboard.serializers import AccountSerializer
from user.models import Account, Transaction
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone

class DashboardView(RetrieveAPIView):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        meses = {
            "Jan": {"value": 0},
            "Fev": {"value": 0},
            "Mar": {"value": 0},
            "Abr": {"value": 0},
            "Maio": {"value": 0},
            "Jun": {"value": 0},
            "Jul": {"value": 0},
            "Ago": {"value": 0},
            "Set": {"value": 0},
            "Out": {"value": 0},
            "Nov": {"value": 0},
            "Dez": {"value": 0},
        }

        nomes_meses = {
            1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Maio", 6: "Jun",
            7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez",}
        
        ano_atual = timezone.localdate().year

        transacoes = (
            Transaction.objects
            .filter(
                account_id=serializer.data["id"],
                date_time_create__year=ano_atual,
                category_id__type="DE",
            )
            .annotate(mes=TruncMonth("date_time_create"))
            .values("mes")
            .annotate(total=Sum("value"))
            .order_by("mes")
        )

        for transacao in transacoes:
            numero_mes = transacao["mes"].month
            nome_mes = nomes_meses[numero_mes]

            meses[nome_mes]["value"] = float(
                transacao["total"] or 0
            )


        total_moviment = {}
        total_moviment["movement"] = {"total_expenses" : 0, "total_despenses": 0, "savings": 0}

        for transaction in Transaction.objects.filter(account_id=serializer.data["id"]):
            if transaction.category.type == "DE":
                total_moviment["movement"]["total_despenses"] += transaction.value
                
            elif transaction.category.type == "RE":
                total_moviment["movement"]["total_expenses"] += transaction.value

        categorys = {}
        for transaction in Transaction.objects.filter(account_id=serializer.data["id"], category_id__type="DE",).order_by("value"):
            if transaction.category.name not in categorys:
                categorys[transaction.category.name] = {
                    "name": transaction.category.name,
                    "value": 0,
                    "type": transaction.category.type,
                    }
            categorys[transaction.category.name]["value"] += transaction.value


        
        total_moviment["movement"]["savings"] = total_moviment["movement"]["total_expenses"] - total_moviment["movement"]["total_despenses"]
        return Response(
            {"Account": serializer.data,
            "Categorys": categorys,
            "Movement": {
                "total_expenses": total_moviment["movement"]["total_expenses"],
                "total_despenses" : total_moviment["movement"]["total_despenses"],
                "savings": total_moviment["movement"]["savings"],
                "despenses_year": meses
                        },
            },
            status=status.HTTP_200_OK
            )


