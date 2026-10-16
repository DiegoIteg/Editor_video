import sqlite3, sys
# apaga perfis de teste (por nome) da base de permissões partilhada da réplica
nome = sys.argv[1] if len(sys.argv) > 1 else 'Compras consulta'
c = sqlite3.connect('/root/work/demo/work.db', timeout=30)
ids = [r[0] for r in c.execute('select id from system_group where name = ?', (nome,))]
for i in ids:
    for t in ('system_group_program', 'system_group_action', 'system_user_group'):
        try: c.execute(f'delete from {t} where system_group_id = ?', (i,))
        except Exception as e: pass
    c.execute('delete from system_group where id = ?', (i,))
c.commit(); print('apagados', ids)
