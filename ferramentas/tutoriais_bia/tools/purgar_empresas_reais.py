"""Retira das CÓPIAS LOCAIS (SQLite) os dados de TODAS as empresas reais (fica só a empresa 1, da demonstração) e apaga segredos.
Inclui a Veloster (conta 3).
Uso: python3 purgar_veloster.py base1.db [base2.db ...]
- apaga linhas de outras empresas (tenant_id/account_id fora de 0/1), as contas e filiais delas, exceto tabelas universais
- apaga palavras-passe/segredos/tokens (exceto as palavras-passe dos utilizadores fictícios de teste 101-107)
- no fim conta quantas células de texto ainda mencionam "veloster" (só a contagem; nunca mostra valores)
Não imprime nenhum valor de dados."""
import sqlite3, sys, re

SEGREDO = re.compile(r'(passw|senha|secret|token|api_?key|apikey|smtp_pass|email_pass|chave_privada|private_key)', re.I)
TESTE = (101, 102, 103, 104, 105, 106, 107)

for db in sys.argv[1:]:
    c = sqlite3.connect(db)
    c.execute('PRAGMA foreign_keys = OFF')
    tabs = [t for (t,) in c.execute("select name from sqlite_master where type='table' and name not like 'sqlite_%'")]
    cols = {t: [r[1] for r in c.execute(f'pragma table_info("{t}")')] for t in tabs}
    apag = 0
    unidades = []
    if 'system_unit' in cols and 'account_id' in cols['system_unit']:
        unidades = [u for (u,) in c.execute('select id from system_unit where account_id is not null and account_id <> 1')]
    UNIVERSAIS = {'grupo_pessoa', 'tipo_id_fiscal', 'tipo_pessoa'}  # tabelas partilhadas (têm o n.º de quem as criou)
    for t in tabs:
        if t in UNIVERSAIS: continue
        for col in ('tenant_id', 'account_id'):
            if col in cols[t]:
                apag += c.execute(f'delete from "{t}" where "{col}" is not null and "{col}" not in (0, 1)').rowcount
    if 'account' in cols:
        apag += c.execute('delete from account where id <> 1').rowcount
    if unidades:
        q = ','.join('?' * len(unidades))
        for t in tabs:
            if t in UNIVERSAIS: continue
            for col in ('system_unit_id', 'unit_id'):  # create_unit NÃO: tabelas partilhadas guardam a filial de quem as criou
                if col in cols[t]:
                    apag += c.execute(f'delete from "{t}" where "{col}" in ({q})', unidades).rowcount
    seg = 0
    for t in tabs:
        for col in cols[t]:
            if SEGREDO.search(col):
                onde = f'"{col}" is not null and "{col}" <> \'\'' + (f' and id not in ({",".join(map(str, TESTE))})' if t == 'system_users' and col == 'password' else '')
                for valor in ('NULL', "''"):
                    try: seg += c.execute(f'update "{t}" set "{col}" = {valor} where {onde}').rowcount; break
                    except sqlite3.Error: continue
    c.commit()
    resto = 0
    for t in tabs:
        for col in cols[t]:
            try: resto += c.execute(f'select count(*) from "{t}" where lower(cast("{col}" as text)) like ?', ('%veloster%',)).fetchone()[0]
            except sqlite3.Error: pass
    c.execute('VACUUM'); c.close()
    print(f'{db}: {apag} linhas de outras empresas retiradas · {seg} segredos apagados · ainda menciona "veloster": {resto} célula(s)')
