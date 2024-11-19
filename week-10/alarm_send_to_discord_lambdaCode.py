import urllib3
import json
def lambda_handler(event, context):
    discord_webhook_url = "https://discord.com/api/webhooks/1308416872198312036/iS7o-dzbI-1D_00jzw8YIgVe62267k3PKaCjtvlOB_dyYN2ANdhjJXuhn7t4uNwaYpbF"
    http = urllib3.PoolManager()
    
    for record in event['Records']:
        sns_message = json.loads(record['Sns']['Message'])
        alarm_name = sns_message.get("AlarmName", "No Alarm Name")
        new_state = sns_message.get("NewStateValue", "UNKNOWN")
        reason = sns_message.get("NewStateReason", "No reason provided")
        
        discord_message = {
            "content": f"Alarm: {alarm_name}\nState: {new_state}\nReason: {reason}"
        }
        
        response = http.request(
            'POST',
            discord_webhook_url,
            body=json.dumps(discord_message),
            headers={'Content-Type': 'application/json'}
        )
        print(f"Discord response status: {response.status}")
    
    return {
        "statusCode": 200,
        "body": json.dumps("Message sent to Discord!")
    }
