#!/bin/bash
# apaga frames de vídeos já montados (não toca no que está a gravar)
cd /root/work/rec
while true; do
  cur=$(ps aux | grep "run.js" | grep -v grep | awk '{print $13}')
  for d in out/*/; do n=$(basename $d); [ -d "$d/frames" ] || continue
    [ -n "$cur" ] && case "$n" in ${cur}_*) continue;; esac
    [ -f final/$n.mp4 ] && [ final/$n.mp4 -nt $d/frames ] && rm -rf "$d/frames"
  done
  sleep 120
done
