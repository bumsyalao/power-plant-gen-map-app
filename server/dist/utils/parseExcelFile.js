"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExcelFile = void 0;
const xlsx = __importStar(require("xlsx"));
const lodash_1 = __importDefault(require("lodash"));
const filePath = './server/assets/eGRID2021_data.xlsx';
function selectFields(inputArray, selectedFields) {
    return lodash_1.default.map(inputArray, (obj) => lodash_1.default.pick(obj, selectedFields));
}
function parseExcelFile() {
    const workbook = xlsx.readFile(filePath);
    const worksheet1JsonData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[3]]);
    const selectedFields = ['Plant file sequence number', 'Plant state abbreviation', 'Plant name', 'Plant latitude', 'Plant longitude', 'Plant annual net generation (MWh)'];
    const selectedJsonDataByFields = selectFields(worksheet1JsonData, selectedFields);
    const plantData = [];
    for (const data of selectedJsonDataByFields) {
        const sequenceNumber = data["Plant file sequence number"];
        if (typeof sequenceNumber === "number") {
            const plantDataMap = {
                name: data['Plant name'],
                plantID: data['Plant file sequence number'],
                netGeneration: data['Plant annual net generation (MWh)'] || 0,
                netPercentage: (data['Plant annual net generation (MWh)'] || 0) / 1000000,
                state: data['Plant state abbreviation'],
                latitude: data['Plant latitude'],
                longitude: data['Plant longitude'],
            };
            plantData.push(plantDataMap);
        }
    }
    return plantData;
}
exports.parseExcelFile = parseExcelFile;
