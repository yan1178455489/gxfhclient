import json

f = open("douban-sectioned-locations.json",'r')  
citys = json.load(f)

data =  {}

for sheng in citys:
    for city in sheng['data']:
        if city['uid'][0].isalpha():
            data.setdefault(city['uid'][0].upper() ,[]).append({
                "cityId":city['id'],
                "cityName":city['name'],
                "cityNameEn":city['uid'],
            })

with open("cityData.json","w") as dump_f:
     json.dump(data,dump_f)