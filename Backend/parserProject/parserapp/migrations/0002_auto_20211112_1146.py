# Generated by Django 3.2.9 on 2021-11-12 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parserapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resume',
            name='age',
        ),
        migrations.AddField(
            model_name='resume',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]
