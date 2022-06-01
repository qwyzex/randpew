import { useState, useEffect, useRef } from "react";
import History from "./History";
import Info from "./Info";
import styles from "../styles/Sidebar.module.sass";
import SVG from "./SVG";
import useLocalHistory from "../hooks/useLocalHistory";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    const local = useLocalHistory();

    useEffect(() => {
        local.getNewList();
        // eslint-disable-next-line
    }, [open]);

    const container = useRef(null);

    return (
        <aside
            className={`${styles.container} ${open ? styles.open : ""}`}
            style={{
                // @ts-ignore
                "--sidebar-width": container.current,
                color: "#ff003c",
            }}
        >
            <section className={styles.main}>
                <div className={styles.buttonWrapper}>
                    <button onClick={() => setOpen(!open)}>
                        <p>&#9652;</p>
                    </button>
                </div>
                <div className={styles.history}>
                    {
                        // history tab
                    }
                    {/* {local.list && (
                        <> */}
                    <div>
                        <h1>HISTORY</h1>
                        <button
                            disabled={local.list?.length == 0}
                            onClick={() => {
                                if (
                                    confirm(
                                        `This will delete all of the history of your generated password from your browser. [ Total: ${local.list.length} ] Are you sure?`
                                    )
                                ) {
                                    localStorage.setItem("passwords", "[]");
                                    local.getNewList();
                                }
                            }}
                        >
                            CLEAR
                        </button>
                    </div>
                    <hr />
                    <ul>
                        {local.list?.length ? (
                            local.list.map((v, i) => (
                                <li key={i}>
                                    <div>
                                        <input readOnly value={v.password} />
                                        <button
                                            onClick={() => {
                                                local.list.splice(i, 1);
                                                localStorage.setItem(
                                                    "passwords",
                                                    JSON.stringify(local.list)
                                                );
                                                local.getNewList();
                                            }}
                                        >
                                            <SVG.Trash />
                                        </button>
                                    </div>
                                    <p>
                                        {new Date(Date.parse(v.date)).toLocaleString()} |
                                        Length : {v.password.length}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <div>NO RECORDED GENERATED PASSWORD</div>
                        )}
                    </ul>
                    {/* </>
                    )} */}
                </div>
            </section>
            <section
                onClick={() => open && setOpen(false)}
                className={styles.overlay}
            ></section>
        </aside>
    );
}

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue] as const;
}
