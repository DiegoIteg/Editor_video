#!/bin/bash
cd /root/work/rec
run() { node run.js $1 > out/rec_$1.log 2>&1 && python3 assemble.py "$2" VENDAS $3 "$4" "$5" > out/asm_$1.log 2>&1; echo "$1 $?" >> out/lote_vendas.log; }
run vnd01 vnd01_painel_do_dia 1 "Painel do dia" "O resumo comercial da oficina num só ecrã"
run vnd02 vnd02_funil_comercial 2 "Funil comercial" "De cada orçamento até à fatura"
run vnd03 vnd03_lancar_orcamento 3 "Lançar um orçamento" "Do pedido do cliente ao orçamento guardado"
run vnd04 vnd04_gerir_orcamentos 4 "Gerir orçamentos" "Alertas, PDF, follow-up, financeiro e reservas"
run vnd05 vnd05_servicos_externos 5 "Serviços externos" "Os trabalhos feitos fora, sob controlo"
run vnd06 vnd06_configuracoes 6 "Configurações de vendas" "Tabelas de preços, serviços e hora técnica"
