#!/bin/bash
# fila: lê o ficheiro inteiro no arranque. Uso: ./lote_q.sh fila.txt
cd /root/work/rec
mapfile -t LINHAS < "${1:-fila.txt}"
for L in "${LINHAS[@]}"; do
  IFS='|' read -r id name mod n tit sub <<< "$L"
  [ -z "$id" ] && continue
  node run.js $id > out/rec_$id.log 2>&1 && python3 assemble.py "$name" "$mod" $n "$tit" "$sub" > out/asm_$id.log 2>&1; echo "$id $?" >> out/lote_q.log
done
