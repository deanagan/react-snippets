import csv
import json
import time
import os

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []

    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf:
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf)

        #convert each csv row into python dict
        for row in csvReader:
            #add this python dict to json array
            if row['PTS'] and row['TRB'] and row['AST'] and row['STL'] and row['BLK'] and row['3P'] and row['3PA'] and int(row['Year']) == 1998:
              jsonArray.append(row)

    #convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString.replace('[', 'export const nbaPlayers = [', 1))

    # with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:


csvFilePath = os.path.join(os.getcwd(), 'src/Seasons_Stats.csv')
jsonFilePath = os.path.join(os.getcwd(), 'src/datalight.js')

start = time.perf_counter()
csv_to_json(csvFilePath, jsonFilePath)
finish = time.perf_counter()

print(f"Conversion 100.000 rows completed successfully in {finish - start:0.4f} seconds")