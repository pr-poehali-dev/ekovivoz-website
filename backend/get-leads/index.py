import json
import os
import urllib.parse
import pg8000.native


def handler(event: dict, context) -> dict:
    """Возвращает список заявок из базы данных."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    u = urllib.parse.urlparse(os.environ['DATABASE_URL'])
    con = pg8000.native.Connection(
        user=urllib.parse.unquote(u.username),
        password=urllib.parse.unquote(u.password),
        host=u.hostname,
        port=u.port or 5432,
        database=u.path.lstrip('/'),
    )
    rows = con.run(
        'SELECT id, name, phone, task, created_at FROM leads ORDER BY created_at DESC'
    )
    con.close()

    leads = [
        {
            'id': row[0],
            'name': row[1],
            'phone': row[2],
            'task': row[3],
            'created_at': row[4].isoformat() if row[4] else None,
        }
        for row in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'leads': leads}, ensure_ascii=False),
    }