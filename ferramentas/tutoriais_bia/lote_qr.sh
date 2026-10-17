#!/bin/bash
# uso: ./lote_qx.sh fila.txt porta "comando de espera"  -> espera até o comando ter sucesso, grava a fila, escreve out/done_<fila>
cd /root/work/rec
until bash -c "$3"; do sleep 15; done
( cd /root/work/demo/site && exec php -S 127.0.0.1:$2 -t . router_app.php > /root/work/demo/php_$2.log 2>&1 ) & SRV=$!
sleep 2
mapfile -t LINHAS < "$1"
for L in "${LINHAS[@]}"; do
  IFS='|' read -r id name mod n tit sub <<< "$L"
  [ -z "$id" ] && continue
  GA_BASE=http://127.0.0.1:$2 node run.js $id > out/rec_$id.log 2>&1 && python3 assemble.py "$name" "$mod" $n "$tit" "$sub" > out/asm_$id.log 2>&1; echo "$id $?" >> out/lote_q.log
done
kill $SRV
touch out/done_$(basename $1 .txt)
