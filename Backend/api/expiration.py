import ssl
import smtplib
import psycopg2 as postgres
from datetime import date, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        # ici tu crées ta propre base de données vu qu'on est pas en production
        'NAME': 'demande_vpn',
        'USER': 'mouhammad',  # ton username
        'PASSWORD': 'droite15',  # ton password
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = "ept.itday@gmail.com"
EMAIL_HOST_PASSWORD = "itday2019"
EMAIL_USE_TLS = True

try:
    db = DATABASES.get('default')
    connection = postgres.connect(
        dbname=db.get('NAME'),
        user=db.get('USER'),
        password=db.get('PASSWORD'),
        host=db.get('HOST'),
        port=db.get('PORT')
    )

    cursor = connection.cursor()

    # Print PostgreSQL Connection properties
    print(connection.get_dsn_parameters(), "\n")

    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")

    DELAIS = 5

    get_demandes_that_expire_in_5_days = """
    SELECT id, objet, date, date_expiration, demandeur_id, beneficiaire_id
    FROM api_demande d
    JOIN auth_user
    USING(id)
    WHERE DATE_TRUNC('day', date_expiration)= CURRENT_DATE + interval '{} day'
    """.format(DELAIS)

    print("Selecting all demande that will expire in five (5) days...")
    cursor.execute(get_demandes_that_expire_in_5_days)
    _demandes_ = cursor.fetchall()
    print(_demandes_)

    print("Found demandes : ")
    demandes = []
    print('---------------------------')
    for demande in _demandes_:
        # demande = {
        #     'id': demande[0],
        #     'objet': demande[1],
        #     'date': demande[2],
        #     'date_expiration': demande[3],
        #     'demandeur_id': demande[4],
        #     'beneficiaire_id': demande[5]
        # }
        print(demande)
        # demandes.append(demande)
        print('---------------------------')

except (Exception, postgres.Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    # closing database connection.
    if(connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

# # port = EMAIL_PORT  # For starttls
# # smtp_server = EMAIL_HOST
# # sender_email = EMAIL_HOST_USER
# # password = EMAIL_HOST_PASSWORD

# # # Create the plain-text and HTML version of your message
# # text = """\
# # Bonjour,
# # Nous vous signalons que votre demande <<{1} - "{2}" du {3}>> va expirer dans {4} jours.""".format(demande.id, demande.objet, demande.date, DELAIS)

# # html = """\
# # <html>
# # <head>
# # <style>
# # table {
# #   font-family: arial, sans-serif;
# #   border-collapse: collapse;
# #   width: 100%;
# # }

# # td, th {
# #   border: 1px solid #dddddd;
# #   text-align: left;
# #   padding: 8px;
# # }

# # tr:nth-child(even) {
# #   background-color: #dddddd;
# # }
# # </style>
# # </head>
# #   <body>
# #     <p>Bonjour,<br>
# #        Nous vous signalons que votre demande ci dessous va expirer dans {0} jours.<br>
# # <table>
# #   <tr>
# #     <th>id</th>
# #     <th>objet</th>
# #     <th>date</th>
# #     <th>date_expiration</th>
# #   </tr>
# #   <tr>
# #     <td>{1}</td>
# #     <td>{2}</td>
# #     <td>{3}</td>
# #     <td>{4}</td>
# #   </tr>
# #        Cliquez sur le lien ci-dessous pour accéder à votre demande.
# #        <a href="http://www.realpython.com">Real Python</a>
# #     </p>
# #   </body>
# # </html>
# # """.format(DELAIS, demande.id, demande.objet, demande.date, demande.date_expiration)

# # # Turn these into plain/html MIMEText objects
# # part1 = MIMEText(text, "plain")
# # part2 = MIMEText(html, "html")

# # message = MIMEMultipart("alternative")
# # message["Subject"] = "Expiration demande"
# # message["From"] = sender_email

# # # Add HTML/plain-text parts to MIMEMultipart message
# # # The email client will try to render the last part first
# # message.attach(part1)
# # message.attach(part2)

# # try:
# #     context = ssl.create_default_context()
# #     server = smtplib.SMTP(smtp_server, port)
# #     server.ehlo()
# #     server.starttls(context=context)
# #     server.login(sender_email, password)

# #     emails = ["demepoulo@gmail.com", "mdiakhate1297@gmail.com"]

# #     for email in emails:
# #         message["To"] = email
# #         server.sendmail(sender_email, email, message.as_string())

    
# # except Exception as e:
# #     print("Error : ", e)
# # finally:
# #     server.quit()

    
# # print("Email sent successfully...")
