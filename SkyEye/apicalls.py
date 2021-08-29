import json
import requests
#query = {'lat':'45', 'lon':'180'}
response = requests.get('https://project-pi-api.herokuapp.com/cameras/612a97019e7a5a35f3e1f3d1')
#print(response.json())

query = {"latitude":response.json()['latitude'],"longitude":response.json()['longitude'],"direction":42,"type":"NONLINEAR_DRIVING"}
print(query)
#query = json.dumps(query, indent = 4)
print(query)
res = requests.post('https://project-pi-api.herokuapp.com/events/create', json=query)
print(res)