const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile("\\\\10.12.29.55\\office\\Share File\\N a u F\\Records Room Floor Plan.xlsx");

const records_floor_plan = (search = null) => {
    // fetch("./src/Records Room Floor Plan.xlsx")
    // .then((res) => res.arrayBuffer())
    // .then((ab) => {
    //   const workbook = xlsx.read(ab, { type: "array" });
    //   console.log("html ", workbook);
    // });
    var lowerCaseSheets = []
    var output = {}
    const sheets = workbook.SheetNames
    sheets.filter((value) => {
        lowerCaseSheets = [...lowerCaseSheets, value.toLowerCase()];
    })

    for (const sheet_num in sheets) {
        var results = []
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


    const jsonString = JSON.stringify(output, null, 4)
    fs.writeFileSync('./public/records.json', jsonString)

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

// console.log(records_floor_plan())
records_floor_plan()