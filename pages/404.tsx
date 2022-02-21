import Router from "next/router";
import { useEffect } from "react";

export default function Error404() {
    useEffect(() => {
        Router.replace("/");
    });

    return <></>;
}
