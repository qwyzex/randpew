import { useState, useEffect } from "react";

export default function useLocalHistory() {
    const [passwords, setPasswords] = useState<Array<any>>([]);

    function getNewList() {
        const v = JSON.parse(localStorage.getItem("passwords")!);

        v !== passwords && setPasswords(v);
    }

    useEffect(() => {
        getNewList();
        // eslint-disable-next-line
    }, []);

    return {
        list: passwords,
        getNewList,
    };
}
