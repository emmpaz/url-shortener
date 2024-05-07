'use server'

import { Redis } from "@upstash/redis";

const short = require('short-uuid');
const redis = Redis.fromEnv();


export const createUrl = async (url: string, days: number) => {
    const shortId : string = short.generate();

    const shortened = shortId.slice(0, 4);
    const ONE_DAY_IN_SECONDS = 86400;

    redis.set(shortened, url, {ex: ONE_DAY_IN_SECONDS * days});

    return `http://localhost:3000/${shortened}`;
}

export const fetchUrl = async(url: string) => {
    const res = await fetch('http://localhost:3000/api/redirect', {
                method: 'POST',
                body: JSON.stringify({route: url})
            });

    const body = await res.json();
    return {
        url : body.replace("\"", "")
    }
}