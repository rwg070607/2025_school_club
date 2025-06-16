from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def a():
    return render_template('popup.html')

@app.route('/data')
def data():
    return jsonify({'data': 'hello world'})

if __name__ == '__main__':
    app.run()