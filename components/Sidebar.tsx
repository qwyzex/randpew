import { useState, useEffect, useRef } from "react";
import styles from "../styles/Sidebar.module.sass";
import SVG from "./SVG";
import useLocalHistory from "../hooks/useLocalHistory";

function List(
    index: number,
    item: {
        password: string;
        date: string;
    },
    local: {
        list: string[];
        getNewList(): void;
    }
) {
    return (
        <li key={index}>
            <div>
                <input readOnly value={item.password} />
                <button
                    onClick={() => {
                        local.list.splice(index, 1);
                        localStorage.setItem("passwords", JSON.stringify(local.list));
                        local.getNewList();
                    }}
                >
                    <SVG.Trash />
                </button>
            </div>
            <p>
                {new Date(Date.parse(item.date)).toLocaleString()} | Length :{" "}
                {item.password.length}
            </p>
        </li>
    );
}

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
                        {/* <p>&#9652;</p> */}
                        <p>OPEN</p>
                    </button>
                </div>
                <div className={styles.history}>
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
                            eval(`local.list.map((v, i) => List(i, v, local)).reverse()`)
                        ) : (
                            <div>NO RECORDED GENERATED PASSWORD</div>
                        )}
                    </ul>
                </div>
            </section>
            <section
                onClick={() => open && setOpen(false)}
                className={styles.overlay}
            ></section>
        </aside>
    );
}
