# Generated by Django 2.2.5 on 2019-09-09 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20190909_1437'),
    ]

    operations = [
        migrations.AlterField(
            model_name='demande',
            name='protocoles',
            field=models.ManyToManyField(related_name='demandes', to='api.Protocole'),
        ),
    ]