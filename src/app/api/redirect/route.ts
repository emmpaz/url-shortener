import { Redis } from "@upstash/redis";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextApiResponse){
    const body = await request.json();
    const redis = Redis.fromEnv();

    const url : string | null = await redis.get(body.route);

    if(url === null) return NextResponse.json(null);
    return NextResponse.json(JSON.stringify(url));
}