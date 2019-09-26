import rest_framework
from rest_framework import serializers, exceptions
from .models import *
from django.contrib.auth.models import User
from .constants import *
from rest_auth.models import TokenModel
from notifications.models import Notification





class ProfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profil
        fields = ['is_securite', 'is_admin', 'entreprise',
                  'telephone', 'departement', 'superieur']


class UserSerializer(serializers.ModelSerializer):
    profil = ProfilSerializer()
    auth_token = models.CharField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profil', 'auth_token')

class SimpleUserSerializer(serializers.ModelSerializer):
    profil = ProfilSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profil')


class ProtocoleSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Protocole
        fields = ('id', 'nom',)


class ApplicationSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id', 'nom', 'adresse_ip')


class ValidateurSecuriteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ValidateurSecurite
        fields = ('user',)


class DemandeListSerializer(serializers.ModelSerializer):
    demandeur = UserSerializer()
    beneficiaire = UserSerializer()
    validateur_hierarchique = UserSerializer()
    validateur_securite = ValidateurSecuriteSerializer()
    protocoles = ProtocoleSeriallizer(many=True)
    applications = ApplicationSeriallizer(many=True)

    class Meta:
        model = Demande
        fields = '__all__'
        read_only_fields = (
            'demandeur',
            'status_demande',
            'validation_hierarchique',
            'validateur_hierarchique',
            'validation_securite',
            'validateur_securite',
            'validation_admin'
        )


class DemandeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'
        read_only_fields = (
            'demandeur',
            'status_demande',
            'validation_hierarchique',
            'validateur_hierarchique',
            'validation_securite',
            'validateur_securite',
            'validation_admin'
        )


class DemandesHierarchieSerializer(serializers.ModelSerializer):
    demandeur = UserSerializer(read_only=True)
    beneficiaire = UserSerializer(read_only=True)
    validateur_hierarchique = UserSerializer(read_only=True)
    protocoles = ProtocoleSeriallizer(many=True, read_only=True)
    applications = ApplicationSeriallizer(many=True, read_only=True)

    class Meta:
        model = Demande
        fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique')
        read_only_fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                            'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique')


class DemandesSecuriteSerializer(serializers.ModelSerializer):
    demandeur = UserSerializer(read_only=True)
    beneficiaire = UserSerializer(read_only=True)
    validateur_hierarchique = UserSerializer(read_only=True)
    validateur_securite = ValidateurSecuriteSerializer(read_only=True)
    protocoles = ProtocoleSeriallizer(many=True, read_only=True)
    applications = ApplicationSeriallizer(many=True, read_only=True)

    class Meta:
        model = Demande

        fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'applications', 'protocoles', 'status_demande', 'validation_hierarchique', 'validateur_hierarchique', 'validation_securite', 'validateur_securite')

        read_only_fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                            'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique', 'validation_securite', 'validateur_securite')


class DemandesAdminSerializer(serializers.ModelSerializer):
    demandeur = UserSerializer(read_only=True)
    beneficiaire = UserSerializer(read_only=True)
    validateur_hierarchique = UserSerializer(read_only=True)
    validateur_securite = ValidateurSecuriteSerializer(read_only=True)
    protocoles = ProtocoleSeriallizer(many=True, read_only=True)
    applications = ApplicationSeriallizer(many=True, read_only=True)

    class Meta:
        model = Demande

        fields = '__all__'

        read_only_fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                            'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique', 'validation_securite', 'validateur_securite', 'validation_admin')

class NotificationSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    level = serializers.CharField()
    recipient = SimpleUserSerializer()
    unread = serializers.CharField()
    verb = serializers.CharField()
    description = serializers.CharField()
    timestamp = serializers.DateTimeField()
    public = serializers.CharField()
    deleted = serializers.CharField()
    slug = serializers.SlugField()
    actor = SimpleUserSerializer()