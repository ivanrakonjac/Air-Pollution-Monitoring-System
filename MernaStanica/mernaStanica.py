from firebase import firebase

firebase = firebase.FirebaseApplication("", None)

def proveriDaLiSamUSistemu(id):
    result = firebase.get('merenja', '')
    for r in result:
        if result.get(r).get("id")==id:
            return r
    return 0


id = 12
lat = 1.489
lng = 212.124
vrednost = list({})


for x in range(6):
    if x%2==0:
        vrednost.insert(0,121)
    else:
        vrednost.insert(0, 17+x)
    print(vrednost)


#vrednost.insert(0, 32)
#print(vrednost)

data = {
    "id": id,
    "lat": lat,
    "lng": lng,
    "vrednost": vrednost
}

key = proveriDaLiSamUSistemu(id)

print(key)

if(key==0):
    key = firebase.post('merenja', data)
    print("Nova vrednost dodata u bazu")
else:
    firebase.put("merenja/" + key, 'vrednost', vrednost)
    print("Vrednost dodata u listu vrednosti")
