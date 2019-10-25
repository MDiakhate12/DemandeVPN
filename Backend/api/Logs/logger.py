import logging
from logging import FileHandler, Formatter


LOG_FORMAT = (
 "%(asctime)s : %(message)s"
)
LOG_LEVEL = logging.INFO

#Login and logout Logger

CONNEXION_LOG_FILE = "./auth.log"

connexion_logger = logging.getLogger("connexion")
connexion_logger.setLevel(LOG_LEVEL)
connexion_logger_file_handler = FileHandler(CONNEXION_LOG_FILE)
connexion_logger_file_handler.setLevel(LOG_LEVEL)
connexion_logger_file_handler.setFormatter(Formatter(LOG_FORMAT,"%b %d %Y  %H:%M:%S"))
connexion_logger.addHandler(connexion_logger_file_handler)


"""

"""