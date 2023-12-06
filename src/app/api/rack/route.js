import { NextRequest, NextResponse } from "next/server";
// const xlsx = require("xlsx");
import { records_floor_plan } from "../../../utils/ConnectToSheet"

const floor_plan = records_floor_plan()
// const workbook = xlsx.readFile("src/test.xlsx");

export async function GET(request) {
    try {
        console.log("reached");
        const workbook = records_floor_plan()
        console.log(workbook);
        
        // const {search} = await request.json()
        const response = NextResponse.json({
            status: 200,
            workbook: workbook
        })
        return response;
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            status: 400
        })
    }
}