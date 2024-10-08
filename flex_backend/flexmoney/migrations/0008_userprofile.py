# Generated by Django 4.1.4 on 2023-04-06 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flexmoney', '0007_delete_userdetails'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profilePic', models.ImageField(blank=True, upload_to='')),
                ('followers', models.IntegerField(blank=True)),
                ('following', models.IntegerField(blank=True)),
                ('posts', models.IntegerField(blank=True)),
            ],
        ),
    ]
