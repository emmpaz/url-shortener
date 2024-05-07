'use client'

import { useEffect } from "react";
import { fetchUrl } from "../functions/actions";

const Redirect = ({ params }: { params: { route: string } }) => {

    useEffect(() => {
        const redirecting = async () => {
            const res = await fetchUrl(params.route);
            window.location.replace(res.url);
        }
        redirecting();
    }, []);


    return (
        <div className="h-screen w-full flex justify-center items-center font-serif">
            <p className="text-xl">thank you using shortlink. redirecting...</p>
        </div>
    )
}

export default Redirect;