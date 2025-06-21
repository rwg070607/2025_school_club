from pysafebrowsing import SafeBrowsing
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

def url_check(url):
    safe_browsing = SafeBrowsing(API_KEY)
    threats = safe_browsing.lookup_urls([url])
    malicious = threats[url]

    return malicious['malicious']

    # if malicious["malicious"]:
    #     print(f"The URL '{url}' is potentially unsafe.")
    #     print("Threat types:", threats)
    # else:
    #     print(f"The URL '{url}' appears to be safe.")

@app.route('/')
def html():
    return render_template('popup.html')


@app.route('/data', methods = ['POST'])
def data():
    try:
        json_data = request.get_json()
        return jsonify({'malicious' : url_check(json_data['data'])}), 200
    
    except Exception as e:
        return jsonify({'err' : str(e)}), 400

if __name__ == '__main__':
    app.run()