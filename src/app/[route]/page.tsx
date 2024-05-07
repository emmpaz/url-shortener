'use client'

import { useEffect } from "react";
import { fetchUrl } from "../functions/actions";

const Redirect = ({ params }: { params: { route: string } }) => {

    useEffect(() => {
        const redirecting = async () => {
            const {url} = await fetchUrl(params.route);
            window.location.replace(url);
        }
        redirecting();
    }, []);


    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <p className="text-md">thank you using shortlink. redirecting if link exists.</p>
            <svg className="animate-spin h-5 w-5 bg-slate-500 mt-4" viewBox="0 0 24 24">
            </svg>
        </div>
    )
}

export default Redirect;