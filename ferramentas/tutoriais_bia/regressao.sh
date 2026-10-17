#!/bin/bash
# corre todos os guiões em ensaio (dry) contra a réplica e junta os erros
cd /root/work/rec; : > out/regressao.txt
while read id; do
  GA_BASE=http://127.0.0.1:8772 timeout 400 node run.js $id dry > out/reg_$id.log 2>&1
  e=$(grep -c "ERRO" out/reg_$id.log); echo "$id erros=$e" >> out/regressao.txt
  grep "ERRO" out/reg_$id.log | head -3 | sed 's/^/    /' >> out/regressao.txt
done < /tmp/claude-0/-home-claude/bd1b60d6-1992-5974-8dfe-863a0d654882/scratchpad/regressao.txt
echo FIM >> out/regressao.txt
