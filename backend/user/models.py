from django.db import models

from django.contrib.auth.models import User


class Account(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    bank_name = models.CharField(max_length=100)
    card_number = models.CharField(max_length=16)
    total_balance = models.FloatField(default=0)
    create_account = models.DateField(auto_created=True)

    def __str__(self): 
        return self.user


class Category(models.Model):

    class Type(models.TextChoices):
        RECEITA = "RE", "Receita"
        DESPESA = "DE", "Despesa"

    class Status(models.TextChoices):
        ATIVO = "AT", "Ativo"
        DESATIVADO = "DE", "Desativado"

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=2, choices=Type.choices)
    description = models.TextField(max_length=300, blank=True, null=True)
    status = models.CharField(max_length=2, choices=Status.choices)
    #icone = 
    #color =

    def __str__(self):
        return self.name


class Transaction(models.Model):
    card = models.OneToOneField(
        Account,
        on_delete=models.CASCADE
    )
    value = models.FloatField()
    date_time_create = models.DateTimeField(auto_created=True)

    category = models.ForeignKey(
        Category, 
        on_delete=models.PROTECT
    )
