const xlsx = require('xlsx');
// import * as xlsx from 'xlsx';

const workbook = xlsx.readFile("public/Records_Room_Floor_Plan.xlsx");

const records_floor_plan = (search = null) => {
    var lowerCaseSheets = []
    var results = []
    var output = {}
    const sheets = workbook.SheetNames
    sheets.filter((value) => {
        lowerCaseSheets = [...lowerCaseSheets, value.toLowerCase()];
    })

    for (const sheet_num in sheets) {
        var sheet_name = sheets[sheet_num]
        var sheet = workbook.Sheets[sheet_name]
        console.log(sheet_name)
        for (let cell = 5; cell < 100; cell++) {
            const value = sheet[`A${cell}`]?.v
            if (value) {
                results = [...results, value]
            } else {
                break
            }
        }
        output[sheet_name.toLowerCase()] = results
    }

    return output;

    // if (lowerCaseSheets.includes(search.toLowerCase())) {
    //     const sheet = workbook.Sheets[search.toUpperCase()]
    //     for (let cell = 5; cell < 100; cell++) {
    //         const value = sheet[`A${cell}`]?.v
    //         if (value) {
    //             results = [...results, value]
    //         } else {
    //             break
    //         }
    //     }
    //     return results
    // }
}

console.log(records_floor_plan())