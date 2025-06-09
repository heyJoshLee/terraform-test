import boto3
import uuid
from datetime import datetime
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PageTraffic')

def lambda_handler(event, context):
    # CORS headers to be used for all responses
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization"
    }
    item = {
        'id': str(uuid.uuid4()),
        'timestamp': datetime.utcnow().isoformat(),
        'ip': event.get('requestContext', {}).get('http', {}).get('sourceIp', 'unknown'),
        'userAgent': event.get('headers', {}).get('user-agent', 'unknown')
    }
    try:
        table.put_item(Item=item)
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"message": "Page view recorded."})
        }
    except Exception as e:
        print("Error writing to DynamoDB:", str(e))
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"message": "Error recording page view."})
        }
