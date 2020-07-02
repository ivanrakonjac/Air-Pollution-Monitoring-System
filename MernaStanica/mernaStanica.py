from firebase import firebase
from random import seed
from random import randint
import datetime

firebase = firebase.FirebaseApplication("", None)

def proveriDaLiSamUSistemu(id):
    result = firebase.get('merenja', '')
    for r in result:
        if result.get(r).get("id")==id:
            return r
    return 0


def setKey(id):
    result = firebase.get('merenja', '')
    for r in result:
        if result.get(r).get("id")==id:
            return r
    return 0


brojac=0;

id = 12
name = "BG-1"
lat = 44.795472
lng = 20.477699

vrednostPM10 = 0
vrednostPM2 = 0
vremeMerenja = ""

data = {
    "id": id,
    "name": name,
    "lat": lat,
    "lng": lng,
}

# seed random number generator
seed(id)

key = proveriDaLiSamUSistemu(id)

for x in range(10):

    datum = datetime.datetime.now()

    vrednostPM10 = randint(0, 200)
    vrednostPM2 = randint(0, 100)

    vrednostSO2 = randint(0, 510)
    vrednostNO2 = randint(0, 410)
    vrednostCO = randint(0, 550)
    vrednostO3 = randint(0, 260)

    vremeMerenja=str(datum.hour) + ":" + str(datum.minute) + ":" + str(datum.second)

    index = str(brojac)

    if key == 0:
        key = firebase.post('merenja', data)
        key = setKey(id)
        print("Nova vrednost dodata u bazu:" + str(data))

    firebase.put("merenja/" + key + "/vrednostPM10", index, vrednostPM10)
    firebase.put("merenja/" + key + "/vrednostPM2", index, vrednostPM2)
    firebase.put("merenja/" + key + "/vrednostSO2", index, vrednostSO2)
    firebase.put("merenja/" + key + "/vrednostNO2", index, vrednostNO2)
    firebase.put("merenja/" + key + "/vrednostCO", index, vrednostCO)
    firebase.put("merenja/" + key + "/vrednostO3", index, vrednostO3)
    firebase.put("merenja/" + key + "/vremeMerenja", index, vremeMerenja)
    print("Vrednost dodata u listu vrednosti: " + str(vrednostPM10) + " " + str(vrednostPM2) +
          " " + str(vrednostSO2) + " " + str(vrednostNO2) +
          " " + str(vrednostCO) + " " + str(vrednostO3) + " " + vremeMerenja)
    brojac = brojac + 1