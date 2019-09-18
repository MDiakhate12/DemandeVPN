from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, CreateAPIView, ListAPIView, RetrieveUpdateAPIView, GenericAPIView
from api.serializers import *   
from api.models import *
from rest_framework.response import Response
from .constants import *
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from datetime import datetime
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import login, logout, authenticate

# class Login(LoginView):


STATUS = Status()

# class LoginAPI(GenericAPIView):
#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         if user is not None:
#             login(user)
        
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'email': user.email
#         })

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
    queryset = Demande.objects.all()
    serializer_class = DemandeListSerializer

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
        # demande['demandeur'] = user
        # demande['validateur_hierarchique'] = user.profil.superieur
        demande['status_demande'] = STATUS.attente_hierarchie
        return super().perform_create(serializer)


class DemandesEnAttenteSecurite(ListAPIView):
    serializer_class = DemandesSecuriteSerializer
    
    def get_queryset(self):
        demandes = Demande.objects.filter(status_demande=STATUS.attente_securite, validation_hierarchique=True)
        return demandes


class DemandesEnAttenteHierarchie(ListAPIView):
    serializer_class = DemandesHierarchieSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        demandes = Demande.objects.filter(demandeur__profil__superieur__username=username, validation_hierarchique=False)
        return demandes

class DemandesEnAttenteAdmin(ListAPIView):
    serializer_class = DemandesAdminSerializer

    def get_queryset(self):
        demandes = Demande.objects.filter(validation_hierarchique=True, validation_securite=True, validation_admin=False).exclude(status_demande=STATUS.valide).exclude(status_demande=STATUS.expire)
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
        demande.validation_admin = False
        demande.date_expiration = datetime.now()
        demande.save()



from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        print("created : "+ created)
        print("sender : "+ sender)
        print("instance : "+ instance)
        Token.objects.create(user=instance)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([AllowAny])
def example_view(request, format=None):
    print(request)
    content = {
        'user': request.user.username,  # `django.contrib.auth.User` instance.
        'auth': request.auth,  # None
    }
    return Response(content)


