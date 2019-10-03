from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('protocoles', views.ProtocoleList)
router.register('applications', views.ApplicationList)

urlpatterns = [
    path('', include(router.urls)),
    
    #Login
    path('login/', views.CustomAuthToken.as_view()),
    path('', include("rest_auth.urls")),

    path('demandes/', views.DemandeList.as_view()),
    path('demandes/<int:id>/', views.DemandeDetail.as_view()),
    path('demandes/create/', views.DemandeCreate.as_view()),
    path('demandes/acceptees/<str:username>/', views.DemandeAccepteesList.as_view()),
    path('demandes/refusees/<str:username>/', views.DemandeRefuseesList.as_view()),

    # Demandes en attente
    path('demandes/en-attente/securite/', views.DemandesEnAttenteSecurite.as_view(), name='demandes-en-attente-securite'),
    path('demandes/en-attente/admin/', views.DemandesEnAttenteAdmin.as_view(), name='demandes-en-attente-admin'),
    path('demandes/en-attente/hierarchie/<str:username>/', views.DemandesEnAttenteHierarchie.as_view(), name='demandes-en-attente-hierarchie'),


    #Validation (Hierarchie / Securite / Admin)
    path('demandes/validation-hierarchie/<int:id>/', views.ValidationHierarchie.as_view(), name="validation-hierarchique-demande"),
    path('demandes/validation-securite/<int:id>/', views.ValidationSecurite.as_view(), name="validation-securite-demande"),
    path('demandes/validation-admin/<int:id>/', views.ValidationAdmin.as_view(), name="validation-admin-demande"),

    #Refus (Hierarchie / Securite)
    path('demandes/refus-hierarchie/<int:id>/', views.RefusHierarchie.as_view(), name="refus-hierarchique-demande"),
    path('demandes/refus-securite/<int:id>/', views.RefusSecurite.as_view(), name="refus-securite-demande"),

    #Expiration
    path('demandes/expiration-admin/<int:id>/', views.Expiration.as_view(), name="expiration-demande"),
    
    path('demandes/validees/securite', views.DemandesValideesSecurite.as_view(), name="demandes-validees-securite"),
    path('demandes/annuler-demande/<int:id>/', views.AnnulerDemande.as_view(),name="annuler-demande")


]
