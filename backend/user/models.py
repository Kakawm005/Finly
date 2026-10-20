from django.db import models

from django.contrib.auth.models import User


class Account(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    total_balance = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    create_account = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self): 
        return self.user.username


class Category(models.Model):

    class Type(models.TextChoices):
        RECEITA = "RE", "Receita"
        DESPESA = "DE", "Despesa"


    name = models.CharField(max_length=100)
    type = models.CharField(max_length=2, choices=Type.choices)
    description = models.TextField(max_length=300, blank=True, null=True)
    status = models.BooleanField(default=True)
    #icone = 
    #color =

    def __str__(self):
        return self.name


class Transaction(models.Model):
    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category, 
        on_delete=models.PROTECT,
        related_name="category"
    )
    value = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    date_time_create = models.DateTimeField(auto_created=True)

    def __str__(self):
        return f"{self.category.name} - {self.date_time_create}"

class CreditCard():
    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE
    )
    bank_name = models.CharField(max_length=100)
    card_number = models.CharField(max_length=16)