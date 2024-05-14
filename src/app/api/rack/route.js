import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/mongo/database"
import Racks from "../../../models/Racks"

connectToDB();

export async function GET(request) {
    try {
        const records = await Racks.find({})
        let results = {}
        records.filter((item) => {
            results[item.rack.toLowerCase()] = item.records
        })
        const response = NextResponse.json({
            status: 200,
            records: results
        })
        return response;
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            status: 400
        })
    }
}