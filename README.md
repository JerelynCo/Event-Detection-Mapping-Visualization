# Event Detection using CDR data

## Abstract
The end result of the study is an event-detecting algorithm (model) based from Metro Manila's Call Detail Records (CDR). The algorithm's prediction of an event is dependent on the geolocation of the clusters (groups of nearby towers through K-Means clustering) and time, wherein analysis of respective network traffic was performed. To qualify the network traffic, the team used the sms, call, and data connection transactions. Panel Ordinary Least Squares regression is used in creating the model. The model gives out a perfect probability, value of one, when an event is detected on a cluster, and value of zero when otherwise.

## Assumptions
The cluster has to maintain its anomalous (abnormally high) network traffic for at least two, and at most four hours for it to be classified as an event

## Screenshot of the visualization
![Screenshot](http://i.imgur.com/9gDIchE.png?1)

## Tech and Data Used

### Data Sources
- Call Detail Records for call, text, and data usage transactions
- Geolocations of the cell towers

### Languages
- Python
    + Flask and Flask-REST-ful
    + Pandas
- Web
    + HTML
    + jQuery
    + CSS
    + Bootstrap
    + d3
    + Leaflet.js

### Credits
- Ma. Adelle Gia Arbo 
- Jerelyn Co 
- Sabrina Constantino 
- Hadrian Paulo Lim 





