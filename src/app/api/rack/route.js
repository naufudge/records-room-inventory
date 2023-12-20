import { NextRequest, NextResponse } from "next/server";
// const xlsx = require("xlsx");
// import { records_floor_plan } from "../../../utils/ConnectToSheet"
import { connectToJson } from "../../../utils/connectToJson"

// const floor_plan = records_floor_plan()
// const workbook = xlsx.readFile("src/test.xlsx");

export async function GET(request) {
    try {
        const records = connectToJson()
        console.log("reached");
        
        // const {search} = await request.json()
        const response = NextResponse.json({
            status: 200,
            records
        })
        return response;
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            status: 400
        })
    }
}