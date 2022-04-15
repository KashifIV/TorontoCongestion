import numpy as np 
import pandas as pd

locations = {
  'Central Area Cordon West': (43.647245, -79.404026),
  'Central Area Cordon East': (43.660816, -79.355048),
  'Central Area Cordon North': (43.670051, -79.389224),
  'Central Area Cordon (After 1986)': (43.658288, -79.381844),
  'City East Boundary': (43.814510, -79.168307),
  'City North Boundary': (43.701288, -79.429347),
  'City West Boundary': (43.652042, -79.560828)
}

# destinations = {
#   '1001I': (43.647245, -79.384026),
#   '1001O':(43.647245, -79.424026),
#   '1002I': (43.681288, -79.429347),
#   '1002O': (43.721288, -79.429347),
#   '1003I': (43.814510, -79.188307), 
#   '1003O': (43.814510, -79.148307),
#   '1014I': (43.647245, -79.394026), 
#   '1014O': (43.647245, -79.414026),
#   '1035I': (43.660816, -79.365048), 
#   '1035O': (43.660816, -79.345048),
#   'Central Area Cordon East': (43.660816, -79.355048),
#   'Central Area Cordon North': (43.670051, -79.389224),
#   'Central Area Cordon (After 1986)': (43.658288, -79.381844),
#   'City East Boundary': (43.814510, -79.168307),
#   'City North Boundary': (43.701288, -79.429347),
#   'City West Boundary': (43.652042, -79.560828)
# }

def get_destination(name, source): 
  difference = 0.01 if 'Cordon' in name else 0.02
  destination = [source[0], source[1]] 
  if 'North' in name: 
    multiplier = 1 if 'Outbound' in name else -1
    destination[0] += difference * multiplier
  elif 'East' in name: 
    multiplier = 1 if 'Outbound' in name else -1
    destination[1] += difference * multiplier
  elif 'West' in name: 
    multiplier = -1 if 'Outbound' in name else 1
    destination[1] += difference * multiplier
  elif 'Central' in name: 
    multiplier = 1 if 'Outbound' in name else -1
    destination[0] += difference * multiplier
  return destination


df = pd.read_csv('../data/Toronto/cc2016_toronto_pm.csv')
df.set_index('Unnamed: 0')

destinations = []
coordinates = []
for i in df.index:
  name = df['Unnamed: 0'][i]
  for key, value in locations.items(): 
    if key in name: 
      coordinates.append(str(value[0]) + ','+ str(value[1]))
      dest = get_destination(name, value)
      destinations.append(str(dest[0]) + ',' + str(dest[1]))

df['COORDINATES'] = coordinates
df['DESTINATIONS'] = destinations

df.to_csv('./Datasets/TorontoMovement/2016_toronto_pm.csv')


