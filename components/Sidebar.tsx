import { useState, useEffect, useRef } from "react";
import History from "./History";
import Info from "./Info";
import styles from "../styles/Sidebar.module.sass";
import SVG from "./SVG";

export default function Sidebar() {
    const [tab, setTab] = useState("history");
    const [open, setOpen] = useState(false);

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
            {open.toString()}
            <div className={styles.outside}>
                <button onClick={() => setOpen(!open)}>
                    <SVG.Triangle />
                </button>
            </div>
            <main>
                <header>{tab === "history" ? <History /> : <Info />}</header>
            </main>
        </aside>
    );
}
