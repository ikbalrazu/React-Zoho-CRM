import flask
import requests
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



def get_access_token():
    url = 'https://accounts.zoho.com/oauth/v2/token'

    params = {
        'grant_type': 'refresh_token',
        'client_id': '1000.AZWKJEMXQTYOM2CAZ5JJGEPX19T21X',
        'client_secret': '2bd811d0460d5d639ce1af089fbe626b0cd279f476',
        'refresh_token': '1000.3954044f7f4ecf344200bd110a4c83a2.7ef153da35a4cad43cf00962de4e00b9'
    }
    
    try:
        response = requests.post(url=url, params=params)
        return response.json().get("access_token")
    except Exception as e:
        response = requests.post(url=url, params=params)
        return response.json().get("access_token")



@app.route('/users', methods=['GET'])
@cross_origin()
def home():
    token = get_access_token()
    url = 'https://www.zohoapis.com/crm/v2/Leads'

    headers = {
        'Authorization': f'Zoho-oauthtoken {token}',
        'If-Modified-Since': '2020-03-19T17:59:50+05:30'
    }

    try:
        response = requests.get(url=url, headers=headers, params=None)
    except Exception as e:
        print(e)
        response = requests.get(url=url, headers=headers, params=None)

    if response is not None:
        print("HTTP Status Code : " + str(response.status_code))
        return response.json()
    
    return "Nothing"


@app.route("/add", methods=["POST"])
@cross_origin()
def add_user():
    token = get_access_token()
    
    form_data = dict()
    form_data["data"] = [request.json]
    
    url = 'https://www.zohoapis.com/crm/v2/Leads'

    headers = {
        'Authorization': f'Zoho-oauthtoken {token}',
    }
    
    response = requests.post(url=url, headers=headers, data=json.dumps(form_data).encode('utf-8'))
    if response.ok:
        print("OK", response)
    print(response)
    return "Nothing"

app.run()
