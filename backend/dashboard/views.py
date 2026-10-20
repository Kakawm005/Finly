from rest_framework.generics import RetrieveAPIView
from dashboard.serializers import AccountSerializer
from user.models import Account, Transaction
from rest_framework.response import Response
from rest_framework import status


class DashboardView(RetrieveAPIView):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        transactions = Transaction.objects.filter(account_id=serializer.data["id"])

        #transactions_serializer = TransactionSerializer(transactions, many=True)


        categorys = {}
        totaldespenses_totalexpenses = {}

        totaldespenses_totalexpenses["movement"] = {
            "total_expenses" : 0,
            "total_despenses": 0,
            "savings": 0
        }

        for transaction in transactions:
            if transaction.category.type == "DE":
                totaldespenses_totalexpenses["movement"]["total_despenses"] += transaction.value
            elif transaction.category.type == "RE":
                totaldespenses_totalexpenses["movement"]["total_expenses"] += transaction.value


            if transaction.category.name not in categorys:
                categorys[transaction.category.name] = {
                    "name": transaction.category.name,
                    "value": 0,
                    "type": transaction.category.type,
                    }

            categorys[transaction.category.name]["value"] += transaction.value

        totaldespenses_totalexpenses["movement"]["savings"] = totaldespenses_totalexpenses["movement"]["total_expenses"] -categorys[transaction.category.name]["value"]


        return Response(
            {"Account": serializer.data,
            "Categorys": categorys,
            "Movement": totaldespenses_totalexpenses
            },
            status=status.HTTP_200_OK
            )