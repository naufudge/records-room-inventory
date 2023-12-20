import { NextRequest, NextResponse } from "next/server";
import { connectToJson } from "../../../utils/connectToJson"

export async function GET(request) {
    try {
        const records = connectToJson()
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