# Generated by Django 4.1.4 on 2023-05-16 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flexmoney', '0013_card'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='due',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
