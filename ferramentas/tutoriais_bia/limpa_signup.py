# apaga a conta de demonstração criada no vídeo da app (réplica local) para o vídeo poder ser regravado
import sqlite3, sys
EMAIL = 'marta.sousa@exemplo.pt'; EMP = 'Auto Reparadora Sol, Lda.'
for db in sys.argv[1:]:
    c = sqlite3.connect(db)
    t = {r[0] for r in c.execute("select name from sqlite_master where type='table'")}
    ids = [r[0] for r in c.execute("select id from system_users where login=? or email=?", (EMAIL, EMAIL))] if 'system_users' in t else []
    for i in ids:
        for tb in ('system_user_group', 'system_user_unit', 'system_user_program'):
            if tb in t: c.execute(f"delete from {tb} where system_user_id=?", (i,))
        c.execute("delete from system_users where id=?", (i,))
    if 'system_unit' in t: c.execute("delete from system_unit where name=?", (EMP,))
    if 'account' in t: c.execute("delete from account where razao_social=?", (EMP,))
    c.commit(); print(db, 'limpo', ids)
