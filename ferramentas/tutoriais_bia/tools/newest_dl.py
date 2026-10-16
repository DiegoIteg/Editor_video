import json, sys
d = json.load(open(sys.argv[1]))
for x in sorted([x for x in d['entries'] if x.get('mtimeMs') and x['name'].startswith('ElevenLabs')], key=lambda x: -x['mtimeMs'])[:2]: print(x['name'], x.get('size'))
