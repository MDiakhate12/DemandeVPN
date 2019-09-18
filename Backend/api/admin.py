from django.contrib import admin
from .models import *

admin.site.register(Demande)
admin.site.register(Profil)
admin.site.register(Protocole)
admin.site.register(Application)
admin.site.register(Admin)
admin.site.register(ValidateurSecurite)