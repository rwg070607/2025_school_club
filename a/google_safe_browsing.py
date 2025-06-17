from pysafebrowsing import SafeBrowsing
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route('/')
def a():
    return render_template('popup.html')


@app.route('/data', methods = ['GET', 'POST'])
def data():
    if request.method == 'GET':
        return jsonify({'data' : 'get'})
    
    else:
        json_data = request.get_json()
        print(json_data)

if __name__ == '__main__':
    app.run()


# sb = SafeBrowsing(API_KEY)

# url_to_check = "http://malware.testing.google.test/testing/malware/"

# threats = sb.lookup_urls([url_to_check])
# malicious = threats[url_to_check]

# if malicious["malicious"]:
#     print(f"The URL '{url_to_check}' is potentially unsafe.")
#     print("Threat types:", threats)
# else:
#     print(f"The URL '{url_to_check}' appears to be safe.")