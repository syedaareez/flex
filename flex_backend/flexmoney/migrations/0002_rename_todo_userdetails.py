# Generated by Django 4.1.4 on 2022-12-11 15:00

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("flexmoney", "0001_initial"),
    ]

    operations = [
        migrations.RenameModel(old_name="Todo", new_name="UserDetails",),
    ]
