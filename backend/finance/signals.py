from django.db.models.signals import pre_save
from user.models import Transaction, Account, Category
from django.dispatch import receiver

@receiver(pre_save, sender=Transaction)
def user_post_save(sender, instance, **kwargs):

    account = instance.account

    if instance.category.type == 'RE':
        Account.objects.filter(pk=account.pk).update(
            total_balance=(account.total_balance + instance.value)
        )

    if instance.category.type == 'DE':
        Account.objects.filter(pk=account.pk).update(
            total_balance=(account.total_balance - instance.value)
        )
    #if Account.objects.filter(id=instance.account.id).total_balace:
    #    pass