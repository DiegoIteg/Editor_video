#!/bin/bash
cd /root/work/rec
node run.js crm03 > out/rec_crm03.log 2>&1 && python3 assemble.py crm03_clientes CRM 3 "Cadastro de clientes" "Registar, consultar e gerir os clientes da oficina" > out/asm_crm03.log 2>&1; echo "crm03 $?" >> out/lote.log
node run.js crm04 > out/rec_crm04.log 2>&1 && python3 assemble.py crm04_pesquisas_satisfacao CRM 4 "Pesquisas de satisfação" "Ouvir o cliente depois de cada trabalho" > out/asm_crm04.log 2>&1; echo "crm04 $?" >> out/lote.log
node run.js crm05 > out/rec_crm05.log 2>&1 && python3 assemble.py crm05_indicadores_qualidade CRM 5 "Indicadores de qualidade" "A satisfação dos clientes em números de gestão" > out/asm_crm05.log 2>&1; echo "crm05 $?" >> out/lote.log
