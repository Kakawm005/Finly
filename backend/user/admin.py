from django.contrib import admin
from .models import User, Account, Category, Transaction
# Register your models here.

admin.site.register([Account, Category, Transaction])
