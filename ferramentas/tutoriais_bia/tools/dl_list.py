import json,glob,os,sys
# uso: dl_list.py [n] -> últimos downloads ElevenLabs do último device_list_dir guardado
f=sorted(glob.glob('/root/.claude/projects/-home-claude/bd1b60d6-1992-5974-8dfe-863a0d654882/tool-results/mcp-remote-devices-device_list_dir-*.txt'),key=os.path.getmtime)[-1]
s=open(f).read(); d=json.loads(s[s.find('{'):])
for x in sorted([x for x in d['entries'] if x.get('mtimeMs') and x['name'].startswith('ElevenLabs')], key=lambda x: -x['mtimeMs'])[:int(sys.argv[1]) if len(sys.argv)>1 else 3]: print(x['name'], x.get('size'))
