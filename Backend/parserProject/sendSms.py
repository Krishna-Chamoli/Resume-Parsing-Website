import json
import requests
from decouple import config

def sendMessage(mobile):
    url = "https://www.fast2sms.com/dev/bulkV2"
    my_data = {
        'sender_id': 'FSTSMS', 
        'message': 'Your resume uploaded successfully', 
        'language': 'english',
        'route': 'q',
        'numbers': mobile    
    }
    headers = {
        'authorization': config("authorization"),
        'Content-Type': "application/x-www-form-urlencoded",
        'Cache-Control': "no-cache"
    }
    response = requests.request("POST", url, data = my_data, headers = headers)
    returned_msg = json.loads(response.text)
    print(returned_msg['message'])

