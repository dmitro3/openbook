import requests
import json
import pandas as pd
import os

# res = requests.get('https://api.the-odds-api.com/v4/sports/?apiKey=7e0b63c2f85c232696de2ed96aea576a')
# sports = pd.DataFrame(json.loads(res.text))
# sports.to_csv('../sports.csv', index=None)

sports = pd.read_csv('sports.csv')

sports = sports.iloc[[0, 1, 6, 8, 11, 14, 18, 25]]

sports = sports.reset_index(drop=True)
full = {}

for idx, row in sports.iterrows():
    
   
    curr = []
    
    
    res = requests.get("https://api.the-odds-api.com/v4/sports/{}/odds/?regions=uk&markets=h2h&apiKey={}".format(row['key'], os.getenv('ODDS_API')))
    events = json.loads(res.text)
    
    for event in events:
        if (pd.to_datetime(event['commence_time']) - pd.to_datetime('now', utc=True)).days > 2:
            curr_event = {}
            curr_event['timestamp'] = event['commence_time']
            curr_event['id'] = event['id']
            curr_event['match'] = [event['home_team'], event['away_team']]


            for outcomes in event['bookmakers']:
                try:
                    odds = {}

                    for outcome in outcomes['markets'][0]['outcomes']:


                        if outcome['name'] == event['home_team']:
                            odds["1"] = outcome['price']

                        if outcome['name'] == event['away_team']:
                            odds["2"] = outcome['price']

                        if outcome['name'] == "Draw":
                            odds["X"] = outcome['price']

                        curr_event["outcomes"] = odds


                    odds = dict(sorted(odds.items()))
                    break
                except:
                    pass
            
            if 'outcomes' in curr_event:
                curr.append(curr_event)
    

    if len(curr) > 0:
        if row['group'] not in full:
            full[row['group']] = {}
            full[row['group']][row['title']] = {}


        full[row['group']][row['title']] = curr[:8]



json.dump(full, open('odds.json', 'w'))