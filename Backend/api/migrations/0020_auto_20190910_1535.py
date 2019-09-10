# Generated by Django 2.2.5 on 2019-09-10 15:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0019_auto_20190910_1522'),
    ]

    operations = [
        migrations.AddField(
            model_name='demande',
            name='applications',
            field=models.ManyToManyField(to='api.Application'),
        ),
        migrations.AddField(
            model_name='demande',
            name='beneficiaire',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='profil',
            name='entreprise',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
