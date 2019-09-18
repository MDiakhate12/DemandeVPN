from django.db import models
from django.contrib.auth.models import User
from .constants import *
from django.contrib.postgres.fields import JSONField
STATUS = Status()

class Protocole(models.Model):
    nom = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.nom


class Application(models.Model):
    nom = models.CharField(max_length=255, null=True, blank=True)
    adresse_ip = models.GenericIPAddressField()

    def __str__(self):
        return self.nom


class Profil(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profil')
    entreprise = models.CharField(max_length=255, null=True, blank=True)
    superieur = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='agents')
    telephone = models.IntegerField(null=True, blank=True)
    departement = models.CharField(max_length=100, choices=DEPARTEMENTS)

    def __str__(self):
        return self.user.username


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class ValidateurSecurite(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Demande(models.Model):

    objet = models.CharField(max_length=100)
    description = models.TextField()
    beneficiaire = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    demandeur = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name='demandes', null=True, blank=True)
    validateur_hierarchique = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name='demandes_agents', null=True, blank=True)
    validation_hierarchique = models.BooleanField(default=False)
    validation_securite = models.BooleanField(default=False)
    validateur_securite = models.ForeignKey(
        ValidateurSecurite, on_delete=models.SET_NULL, related_name='demandes_recues', null=True, blank=True)
    validation_admin = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    date_expiration = models.DateTimeField(null=True, blank=True)
    protocoles = models.ManyToManyField(Protocole)
    applications = models.ManyToManyField(Application)
    status_demande = models.CharField(max_length=100, default=STATUS.attente_hierarchie)

    def __str__(self):
        return self.objet

    # def get_status(self):
    #     return self.status_demande

    # def set_status(self, status):
    #     try:
    #         if(status in dir(STATUS)[-7:-1]+dir(STATUS)[-1:]):
    #             self.status_demande = STATUS.__getattribute__(status)
    #             return True
    #         raise ValueError
    #     except ValueError:
    #         print("Le status " + status + " n'existe pas.")
    #         return False
