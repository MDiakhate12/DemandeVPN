DEPARTEMENTS = (
    ('csps', 'CSPS'),
    ('ilab', 'I-LAB'),
    ('ins', 'INS'),
    ('ocio', 'OCIO'),
    ('aps', 'APS'),
    ('dac', 'DAC'),
    ('eai', 'EAI'),
    ('a2i', 'A2I'),
)

class Status(object):
    attente_hierarchie = "En attente de la validation du supérieur hierarchique"
    attente_securite =  "En attente de la validation sécurité"
    attente_admin =  "En attente de la configuration de l'admin"
    valide =  "Demande validée, VPN ouvert"
    expire =  "Demande expirée, VNP fermé"
    refus_hierarchie = "Refus du supérieur hierarchique"
    refus_securite =  "Refus de la sécurité"
    attente_prolongation = "Demande en attente de la validation hierarchique"
    


PROTOCOLES = (
    ('http', 'HTTP'),
    ('https', 'HTPPS'),
    ('tcp', 'TCP'),
    ('ip', 'IP')
)

TYPES = (
    'validation-hierarchique',
    'validation-securite',
    'validation-admin',
    'refus-hierarchie',
    'refus-securite',
    'expiration-admin',
    'reception-user',
    'reception-hierarchie',
    'reception-securite',
    'reception-admin',
    'expiration',
)

NOTIFICATIONS = (
    
)
