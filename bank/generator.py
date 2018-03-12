import plyvel
import random
import math
from random import choice

db = plyvel.DB('./math_level_db', create_if_missing=True);

# init db
for key, value in db:
  db.delete(key)

# generate adding
an=0;
for i in range(2,10):
  for j in range(2,10):
    an = an+1;
    db.put(('A1_'+str(an).zfill(2)).encode('utf-8'), (str(i)+' + '+str(j)+' = ').encode('utf-8'))

# generate mutiplexing
mn=0;
for i in range(2,10):
  for j in range(2,10):
    mn = mn+1;
    db.put(('M1_'+str(mn).zfill(2)).encode('utf-8'), (str(i)+' x '+str(j)+' = ').encode('utf-8'))

# generate substracting
sn=0;
for i in range(2,10):
  for j in range(2,i):
    sn = sn+1;
    db.put(('S1_'+str(sn).zfill(2)).encode('utf-8'), (str(i)+' - '+str(j)+' = ').encode('utf-8'))

sn=0;
for i in range(10,19):
  for j in range(i%10+1,10):
    sn = sn+1;
    db.put(('S2_'+str(sn).zfill(2)).encode('utf-8'), (str(i)+' - '+str(j)+' = ').encode('utf-8'))

# generate dividing
dn=0;
for i in range(2,10):
  for j in range(2,i):
    dn = dn+1;
    db.put(('D1_'+str(dn).zfill(2)).encode('utf-8'), (str(i)+' / '+str(j)+' = ').encode('utf-8'))

dn=0;
for i in range(2,90):
  for j in range(i//10+1,min(i,10)):
    dn = dn+1;
    db.put(('D2_'+str(dn).zfill(3)).encode('utf-8'), (str(i)+' / '+str(j)+' = ').encode('utf-8'))

db.close();
