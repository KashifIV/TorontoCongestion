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
df = pd.read_csv('../data/Toronto/cc2016_toronto_pm.csv')
df.set_index('Unnamed: 0')

coordinates = []
for i in df.index:
  name = df['Unnamed: 0'][i]
  for key, value in locations.items(): 
    if key in name: 
      coordinates.append(str(value[0]) + ','+ str(value[1]))

df['COORDINATES'] = coordinates

df.to_csv('./Datasets/TorontoMovement/2016_toronto_pm.csv')


