# Generated by Django 2.2.5 on 2019-09-10 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20190909_1524'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(blank=True, max_length=255, null=True)),
                ('addresse_ip', models.GenericIPAddressField()),
            ],
        ),
        migrations.AddField(
            model_name='profil',
            name='telephone',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
