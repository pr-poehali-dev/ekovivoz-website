import json
import os
import http.client


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта в Telegram-бот."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    task = body.get('task', '').strip()

    if not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Телефон обязателен'}),
        }

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '5604974568'

    text = (
        'Новая заявка с сайта ЭКОвывоз\n\n'
        f'Имя: {name or "не указано"}\n'
        f'Телефон: {phone}\n'
        f'Задача: {task or "не указана"}'
    )

    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
    })

    conn = http.client.HTTPSConnection('api.telegram.org', timeout=15)
    conn.request(
        'POST',
        f'/bot{token}/sendMessage',
        body=payload,
        headers={'Content-Type': 'application/json'},
    )
    resp = conn.getresponse()
    result = json.loads(resp.read())
    conn.close()

    if not result.get('ok'):
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Telegram error', 'details': result}),
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }
