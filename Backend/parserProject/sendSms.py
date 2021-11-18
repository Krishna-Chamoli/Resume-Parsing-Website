import json
import requests

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
        'authorization': 'qcWbsB3DYpj1mnrUgNKSEzQ8k0fyO4JeGa95TwCF62utXoAlPVgsVQwzauhe97BASOG3YKWJRM08X2I1',
        'Content-Type': "application/x-www-form-urlencoded",
        'Cache-Control': "no-cache"
    }
    response = requests.request("POST", url, data = my_data, headers = headers)
    returned_msg = json.loads(response.text)
    print(returned_msg['message'])