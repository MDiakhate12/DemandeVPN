from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
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
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from django.utils import timezone
from django.db.models import Q
from django.core.mail import send_mail

STATUS = Status()

# send_mail(
#     subject='Invitation SmartMeeting',
#     message=strip_tags(html_message),
#     from_email='mdiakhate1297@gmail.com',
#     recipient_list=[
#         email for email in emails if email != request.user.email],
#     html_message=html_message
# )


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        print('---------------------------------------------------')
        print(user.is_authenticated)
        print(user)
        print('---------------------------------------------------')
        return Response({
            'token': token.key,
            'id': user.pk,
            'username': user.username,
            'is_securite': user.profil.is_securite,
            'is_admin': user.profil.is_admin,
        })


class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


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


# class DemandeCreate(CreateAPIView):
#     queryset = Demande.objects.all()
#     serializer_class = DemandeCreateSerializer

#     def post(self, request):
#         print('---------------------------------------------------------------------')
#         print(request.data)
#         print('---------------------------------------------------------------------')
#         serializer =  DemandeCreateSerializer(data=request.data)
#         demande = Demande()
#         if serializer.is_valid():

#             print(demande)
#             user = request.user
#             demande.demandeur = user
#             demande.validateur_hierarchique = user.profil.superieur
#             demande.status_demande = STATUS.attente_hierarchie
#             demande.save()
#             serializer.save()
#             send_mail(
#                 subject='Nouvelle demande VPN',
#                 message='Vous avez une nouvelle demande',
#                 from_email=demande.demandeur.email,
#                 recipient_list=[user.profil.superieur.email],
#             )
#             return Response(serializer.data, status= status.HTTP_201_CREATED)


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
        super().perform_create(serializer)
        send_mail(
            subject='Nouvelle demande VPN',
            message='Vous avez une nouvelle demande',
            from_email='',
            recipient_list=[user.profil.superieur.email],
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DemandesEnAttenteUser(ListAPIView):
    serializer_class = DemandeListSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        demandes = Demande.objects.filter(
            demandeur__username=username, validation_admin=False)
        return demandes


class DemandesEnAttenteSecurite(ListAPIView):
    serializer_class = DemandesSecuriteSerializer

    def get_queryset(self):
        demandes = Demande.objects.filter(
            status_demande=STATUS.attente_securite, validation_hierarchique=True)
        return demandes


class DemandesEnAttenteHierarchie(ListAPIView):
    serializer_class = DemandesHierarchieSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        demandes = Demande.objects.filter(
            demandeur__profil__superieur__username=username, validation_hierarchique=False)
        return demandes


class DemandesEnAttenteAdmin(ListAPIView):
    serializer_class = DemandesAdminSerializer

    def get_queryset(self):
        demandes = Demande.objects.filter(validation_hierarchique=True, validation_securite=True, validation_admin=False).exclude(
            status_demande=STATUS.valide).exclude(status_demande=STATUS.expire)
        return demandes


class ValidationHierarchie(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesHierarchieSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        if(demande.validation_hierarchique == False and demande.status_demande == STATUS.attente_hierarchie):
            demande.validation_hierarchique = True
            demande.status_demande = STATUS.attente_securite
            demande.save()
            emails = []
            for validateur in ValidateurSecurite.objects.all():
                emails.append(validateur.user.email)
            send_mail(
                subject='Validation de votre superieur',
                message='Votre superieur vient de valider votre demande',
                from_email='',
                recipient_list=[demande.demandeur.email],
            )
            send_mail(
                subject='Nouvelle demande VPN',
                message='Vous avez une nouvelle demande à valider',
                from_email='',
                recipient_list=emails,
            )


class ValidationSecurite(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesSecuriteSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        user = self.request.user
        print('-------------------------------')
        print(user)
        hasattr(user, 'profil_securite')
        print('-------------------------------')

        if(hasattr(user, 'profil_securite')):
            validateur_securite = user.profil_securite

            # if(validateur_securite in ValidateurSecurite.objects.all()):
            if(demande.validation_hierarchique == True and demande.status_demande == STATUS.attente_securite):
                demande.validation_securite = True
                demande.validateur_securite = validateur_securite
                demande.status_demande = STATUS.attente_admin
                demande.save()
                emails = []
                for admin in Admin.objects.all():
                    emails.append(admin.user.email)
                send_mail(
                    subject='Validation de la sécurité',
                    message='La sécurité vient de valider votre demande',
                    from_email='',
                    recipient_list=[demande.demandeur.email],
                )
                send_mail(
                    subject='Nouvelle demande VPN',
                    message='Vous avez une nouvelle demande à configurer',
                    from_email='',
                    recipient_list=emails,
                )
        else:
            raise PermissionDenied(
                {"message": "Vous n'avez pas le droit de faire cette validation. Elle est reservée à la sécurité."})


class ValidationAdmin(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesAdminSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        user = self.request.user

        print('------------------------------------------------')
        print(user)
        print(hasattr(user, 'profil_admin'))
        print('------------------------------------------------')

        if(hasattr(user, 'profil_admin')):

            if(demande.validation_securite == True and demande.status_demande == STATUS.attente_admin):
                demande.validation_admin = True
                demande.status_demande = STATUS.valide
                send_mail(
                    subject="Configuration demande",
                    message="L'admin vient de configurer votre demande, veuillez consulter agassi pour voir les applications disponibles.",
                    from_email='',
                    recipient_list=[demande.demandeur.email],
                )
                demande.save()
        else:
            raise PermissionDenied(
                {"message": "Vous n'avez pas le droit de faire cette validation. Elle est reservée à l'admin."})


class RefusHierarchie(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesHierarchieSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        demande.validation_hierarchique = False
        demande.status_demande = STATUS.refus_hierarchie
        demande.save()
        send_mail(
            subject="Refus supérieur",
            message="Votre supérieur vient de refuser votre demande",
            from_email='',
            recipient_list=[demande.demandeur.email],
        )


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
            send_mail(
                subject='Refus de la sécurité',
                message='La sécurité vient de refuser votre demande',
                from_email='',
                recipient_list=[demande.demandeur.email],
            )


class DemandeAccepteesList(ListAPIView):
    serializer_class = DemandeListSerializer

    def get_queryset(self):
        demandeur = self.kwargs['username']
        demandes = Demande.objects.filter(demandeur__profil__user__username=demandeur, status_demande=STATUS.valide,
                                          validation_hierarchique=True, validation_securite=True, validation_admin=True).order_by("-date")
        return demandes


class DemandeRefuseesList(ListAPIView):
    serializer_class = DemandeListSerializer

    def get_queryset(self):
        demandeur = self.kwargs['username']
        demandes = Demande.objects.filter(Q(status_demande=STATUS.refus_hierarchie) | Q(
            status_demande=STATUS.refus_securite), demandeur__profil__user__username=demandeur).order_by("-date")
        return demandes


class DemandesValideesSecurite(ListAPIView):
    serializer_class = DemandesSecuriteSerializer

    def get_queryset(self):
        demandes = Demande.objects.filter(
            validation_hierarchique=True, validation_securite=True).order_by("-date")
        return demandes


class DemandesCloturees(ListAPIView):
    serializer_class = DemandesAdminSerializer

    def get_queryset(self):
        demandeur = self.kwargs['username']
        demandes = Demande.objects.filter(demandeur__profil__user__username=demandeur).filter(Q(status_demande=STATUS.valide,
                                                                                                validation_hierarchique=True, validation_securite=True, validation_admin=True) |
                                                                                              Q(status_demande=STATUS.refus_hierarchie) | Q(status_demande=STATUS.refus_securite)).order_by("-date")
        return demandes


class Expiration(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandesAdminSerializer
    lookup_field = "id"

    def perform_update(self, serializer):
        demande = Demande.objects.get(pk=serializer.data["id"])
        demande.status_demande = STATUS.expire
        demande.validation_admin = False
        demande.date_expiration = datetime.now()
        demande.save()
        send_mail(
            subject="Expiration demande",
            message="Votre demande vient d'expirer",
            from_email='',
            recipient_list=[demande.demandeur.email],
        )
