#!/bin/bash
cd /root/work/rec
while pgrep -f "lote_vendas.sh|lote_producao.sh" >/dev/null; do sleep 20; done
run() { node run.js $1 > out/rec_$1.log 2>&1 && python3 assemble.py "$2" FINANCEIRO $3 "$4" "$5" > out/asm_$1.log 2>&1; echo "$1 $?" >> out/lote_fin.log; }
run fin01 fin01_painel_do_dia 1 "Painel do dia" "O que entra, o que sai e o que está atrasado"
run fin02 fin02_analise_financeira 2 "Análise financeira" "O ano em números de gestão"
