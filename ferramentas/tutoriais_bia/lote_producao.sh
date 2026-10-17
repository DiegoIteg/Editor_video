#!/bin/bash
cd /root/work/rec
while pgrep -f lote_vendas.sh >/dev/null; do sleep 20; done
run() { node run.js $1 > out/rec_$1.log 2>&1 && python3 assemble.py "$2" PRODUÇÃO $3 "$4" "$5" > out/asm_$1.log 2>&1; echo "$1 $?" >> out/lote_producao.log; }
run prd01 prd01_painel_do_dia 1 "Painel do dia" "A oficina de hoje num só ecrã"
run prd02 prd02_controlo_producao 2 "Controlo de produção" "O quadro da oficina, ao minuto"
run prd03 prd03_trabalhar_os 3 "Trabalhar uma ordem de serviço" "Etapas, pausas, material, técnico e conclusão"
run prd04 prd04_servico_externo 4 "Pedir um serviço externo" "Quando parte do trabalho é feita por um fornecedor"
