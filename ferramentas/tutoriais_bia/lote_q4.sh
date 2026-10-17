#!/bin/bash
# espera pela fila anterior, arranca um servidor próprio (porta 8774) e grava a fila indicada
cd /root/work/rec
until grep -q "^${2:-vnd04} " out/lote_q.log 2>/dev/null; do sleep 15; done
( cd /root/work/demo/site && exec php -S 127.0.0.1:8774 -t . > /root/work/demo/php_8774.log 2>&1 ) & SRV=$!
sleep 2
mapfile -t LINHAS < "$1"
for L in "${LINHAS[@]}"; do
  IFS='|' read -r id name mod n tit sub <<< "$L"
  [ -z "$id" ] && continue
  GA_BASE=http://127.0.0.1:8774 node run.js $id > out/rec_$id.log 2>&1 && python3 assemble.py "$name" "$mod" $n "$tit" "$sub" > out/asm_$id.log 2>&1; echo "$id $?" >> out/lote_q.log
done
kill $SRV
