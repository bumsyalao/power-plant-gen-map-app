import * as xlsx from 'xlsx';
import * as fs from 'fs';
import _ from 'lodash';

interface PlantData {
    name: string;
    plantID: number;
    netGeneration: number;
    netPercentage: number;
    state: string;
    latitude: number;
    longitude: number;
}

const filePath = './server/assets/eGRID2021_data.xlsx';

function selectFields(inputArray: any[], selectedFields: string[]): any[] {
    return _.map(inputArray, (obj) => _.pick(obj, selectedFields));
}

export function parseExcelFile(): PlantData[] {
    const workbook = xlsx.readFile(filePath);

    const worksheet1JsonData: any = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[3]]);
    const selectedFields = ['Plant file sequence number', 'Plant state abbreviation', 'Plant name', 'Plant latitude', 'Plant longitude', 'Plant annual net generation (MWh)'];
    const selectedJsonDataByFields: any = selectFields(worksheet1JsonData, selectedFields);


    const plantData: PlantData[] = [];

    for (const data of selectedJsonDataByFields) {
        const sequenceNumber = data["Plant file sequence number"];

        if (typeof sequenceNumber === "number") {
            const plantDataMap: PlantData = {
                name: data['Plant name'],
                plantID: data['Plant file sequence number'],
                netGeneration: data['Plant annual net generation (MWh)'] || 0,
                netPercentage: (data['Plant annual net generation (MWh)'] || 0) / 1000000,
                state: data['Plant state abbreviation'],
                latitude: data['Plant latitude'],
                longitude: data['Plant longitude'],

            };
            plantData.push(plantDataMap)
        }
    }


    return plantData;
}

