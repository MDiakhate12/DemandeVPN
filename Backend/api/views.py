from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, CreateAPIView, ListAPIView, RetrieveUpdateAPIView
from api.serializers import *   
from api.models import *
from rest_framework.response import Response
from .constants import *
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from django.db.models import Q

STATUS = Status()

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ApplicationList(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSeriallizer

class ProtocoleList(ModelViewSet):
    queryset = Protocole.objects.all()
    serializer_class = ProtocoleSeriallizer

class DemandeList(ListAPIView):
    queryset = Demande.objects.all().order_by("-date")
    serializer_class = DemandeListSerializer

class DemandeAccepteesList(ListAPIView):
    serializer_class = DemandeListSerializer
    
    def get_queryset(self):
        demandeur = self.kwargs['username']
        demandes = Demande.objects.filter(demandeur__profil__user__username=demandeur,status_demande=STATUS.valide, validation_hierarchique=True, validation_securite=True, validation_admin=True).order_by("-date")
        return demandes

class DemandeRefuseesList(ListAPIView):
    serializer_class = DemandeListSerializer
    
    def get_queryset(self):
        demandeur = self.kwargs['username']
        demandes = Demande.objects.filter( Q(status_demande=STATUS.refus_hierarchie) | Q(status_demande=STATUS.refus_securite),demandeur__profil__user__username=demandeur).order_by("-date")
        return demandes

    
    

class DemandeUpdate(UpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeCreateSerializer
    lookup_field = "id"

class DemandeDetail(RetrieveAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeListSerializer
    lookup_field = "id"

class DemandeCreate(CreateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeCreateSerializer

    def perform_create(self, serializer):
        demande = serializer.validated_data
        user = serializer.context['request'].user
        print("Utilisateur : "+str(user))
        demande['demandeur'] = user
        demande['validateur_hierarchique'] = user.profil.superieur
        demande['status_demande'] = STATUS.attente_hierarchie
        return super().perform_create(serializer)


class DemandesEnAttenteSecurite(ListAPIView):
    serializer_class = DemandesSecuriteSerializer
    
    def get_queryset(self):
        demandes = Demande.objects.filter(status_demande=STATUS.attente_securite, validation_hierarchique=True).order_by("-date")
        return demandes


class DemandesEnAttenteHierarchie(ListAPIView):
    serializer_class = DemandesHierarchieSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        demandes = Demande.objects.filter(demandeur__profil__superieur__username=username, validation_hierarchique=False).order_by("-date")
        return demandes

class DemandesEnAttenteAdmin(ListAPIView):
    serializer_class = DemandesAdminSerializer

    def get_queryset(self):
        demandes = Demande.objects.filter(validation_hierarchique=True, validation_securite=True).order_by("-date")
        return demandes



class ValidationHierarchie(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesHierarchieSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        if(demande.validation_hierarchique == False and demande.status_demande == STATUS.attente_hierarchie):
            demande.validation_hierarchique=True
            demande.status_demande =  STATUS.attente_securite
            demande.save()
        

class ValidationSecurite(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesSecuriteSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        if(demande.validation_hierarchique==True and demande.status_demande == STATUS.attente_securite):
            demande.validation_securite = True
            demande.status_demande = STATUS.attente_admin
            demande.save()


class ValidationAdmin(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesAdminSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        if(demande.validation_securite == True and demande.status_demande == STATUS.attente_admin):
            demande.validation_admin = True
            demande.status_demande =  STATUS.valide
            demande.save()


class RefusHierarchie(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesHierarchieSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        demande.validation_hierarchique = False
        demande.status_demande = STATUS.refus_hierarchie
        demande.save()


class RefusSecurite(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesSecuriteSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        if(demande.validation_hierarchique == True):
            demande.validation_securite = False
            demande.status_demande = STATUS.refus_securite
            demande.save()


class Expiration(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesAdminSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        demande.status_demande =  STATUS.expire
        demande.save()

