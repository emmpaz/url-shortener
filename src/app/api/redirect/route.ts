import { Redis } from "@upstash/redis";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextApiResponse){
    const body = await request.json();
    const redis = Redis.fromEnv();

    const url : string | null = await redis.get(body.route);

    return NextResponse.json(JSON.stringify(url));
}