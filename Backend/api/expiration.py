import threading
import time


def foo():
    print(time.ctime())


WAIT_TIME_SECONDS = 2

threading.Timer(WAIT_TIME_SECONDS, foo)