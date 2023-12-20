const records = require("../../public/records.json")

export const connectToJson = () => {
    // fetch('C:/Users/mohamed.nauf/Desktop/records-room-inventory/public/records.json')
    //     .then((res) => {
    //         return res.json();
    //     }).then((data) => {
    //         const Data = data;
    //     })
    console.log(records)
    return records;
}