#!/bin/bash
# uso: ./qc.sh prd03_trabalhar_os  -> folha de contacto + LUFS + tamanho
f=/root/work/rec/final/$1.mp4; SP=/tmp/claude-0/-home-claude/bd1b60d6-1992-5974-8dfe-863a0d654882/scratchpad
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f"); echo "dur $d"
ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$f" | head -1
n=$(python3 -c "print(max(4, int(float('$d')/20)))")
ffmpeg -v error -i "$f" -vf "fps=1/$(python3 -c "print(float('$d')/20)"),scale=480:-1,tile=4x5" -frames:v 1 -y $SP/qc_$1.jpg
ffmpeg -i "$f" -af ebur128 -f null - 2>&1 | grep -A1 "Integrated" | tail -1
# frames com tamanho anómalo: procura linhas pretas/zoom pela variação de resolução do ecrã gravado
cp "$f" /mnt/user-data/outputs/
