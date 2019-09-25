from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework import routers
import notifications.urls

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('protocoles', ProtocoleList)
router.register('applications', ApplicationList)

urlpatterns = [
    path('', include(router.urls)),
    path('inbox/notifications/', include(notifications.urls, namespace='notifications')),

    # Login

    path("login/", CustomAuthToken.as_view()),

    path('', include("rest_auth.urls")),


    path('demandes/', DemandeList.as_view()),
    
    path('demandes/validees/securite/', DemandesValideesSecurite.as_view(), name="demandes-validees-securite"),

    path('demandes/acceptees/<str:username>/', DemandeAccepteesList.as_view()),
    path('demandes/cloturees/<str:username>/', DemandesCloturees.as_view()),
    path('demandes/refusees/<str:username>/', DemandeRefuseesList.as_view()),


    path('demandes/create/', DemandeCreate.as_view()),
    path('demandes/<int:id>/', DemandeDetail.as_view()),

    # Demandes en attente
    path('demandes/en-attente/securite/', DemandesEnAttenteSecurite.as_view(), name='demandes-en-attente-securite'),
    path('demandes/en-attente/admin/', DemandesEnAttenteAdmin.as_view(), name='demandes-en-attente-admin'),
    path('demandes/en-attente/<str:username>/', DemandesEnAttenteUser.as_view(), name='demandes-en-attente-utilisateur'),
    path('demandes/en-attente/hierarchie/<str:username>/', DemandesEnAttenteHierarchie.as_view(), name='demandes-en-attente-hierarchie'),

    # Demandes acceptées & refusées




    #Validation (Hierarchie / Securite / Admin)
    path('demandes/validation-hierarchie/<int:id>/', ValidationHierarchie.as_view(), name="validation-hierarchique-demande"),
    path('demandes/validation-securite/<int:id>/', ValidationSecurite.as_view(), name="validation-securite-demande"),
    path('demandes/validation-admin/<int:id>/', ValidationAdmin.as_view(), name="validation-admin-demande"),

    #Refus (Hierarchie / Securite)
    path('demandes/refus-hierarchie/<int:id>/', RefusHierarchie.as_view(), name="refus-hierarchique-demande"),
    path('demandes/refus-securite/<int:id>/', RefusSecurite.as_view(), name="refus-securite-demande"),

    # Expiration
    path('demandes/expiration-admin/<int:id>/', Expiration.as_view(), name="expiration-demande"),

]
