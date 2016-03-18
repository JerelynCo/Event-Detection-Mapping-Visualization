from flask import Flask, render_template, make_response
from flask_restful import Api, Resource
import pandas as pd

app = Flask(__name__)
api = Api(app)

all_data = pd.read_csv("data/sample_new.csv")
all_data.drop(all_data.columns[[0]], inplace=True, axis = 1)
data = pd.DataFrame()

class Data(Resource):
	def get(self, date):
		data = all_data[all_data['day'] == int(date)]
		return make_response(data.to_json(orient='records'))
api.add_resource(Data,'/api/data/<string:date>')

@app.route('/')
def index():
	return render_template('map.html')

if __name__ == '__main__':
    app.run(debug=True)
