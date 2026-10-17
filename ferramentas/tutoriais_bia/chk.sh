#!/bin/bash
# uso: ./chk.sh <id>  -> pausas > 2.5 s (ações > voz)
grep AVISO out/rec_$1.log | python3 -c "
import sys,re
for l in sys.stdin:
    m=re.search(r'(s\d+): ações ([\d.]+)s > voz ([\d.]+)s',l)
    if m and float(m.group(2))-float(m.group(3))>2.5: print('  ',m.group(1),round(float(m.group(2))-float(m.group(3)),1))
"; grep -i "erro" out/rec_$1.log | head -3
