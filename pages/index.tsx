import type {NextPage} from "next";
import Head from "next/head";
import {useEffect, useState} from "react";
import Form from "../components/Form";
import Sidebar from "../components/Sidebar";
import SVG from "../components/SVG";
import styles from "../styles/Home.module.sass";
import Image from "next/image";

const Home: NextPage = () => {
    const [theme, setTheme] = useState<string>("light");

    function getTheme() {
        let theme = localStorage.getItem("theme");
        if (theme) {
            setTheme(theme);
        } else {
            localStorage.setItem("theme", "light");
        }
    }

    useEffect(() => {
        getTheme();
    }, [theme]);

    return (
        <div
            className={`${styles.container} ${
                theme === "dark" ? styles.dark : styles.light
            }`}
        >
            <Head>
                <title>Randpew</title>
                <meta
                    name="description"
                    content="Modern, Safe, Open Source Random Password Generator"
                />
                <link rel="icon" href="/icon_white_pink.png"/>
            </Head>

            <div className={styles.logo_backdrop}>
                <Image src={'/logo_full.png'} width={650} height={800} alt=""/>
            </div>

            <div className={styles.themeButtonWrapper}>
                <button
                    className={styles.themeButton}
                    onClick={() => {
                        if (theme === "light") {
                            localStorage.setItem("theme", "dark");
                            getTheme();
                        } else {
                            localStorage.setItem("theme", "light");
                            getTheme();
                        }
                    }}
                >
                    <SVG.Sun className={theme === "light" ? styles.active : ""}/>
                    <SVG.Moon className={theme === "dark" ? styles.active : ""}/>
                    {/* {theme === "light" ? <SVG.Sun /> : <SVG.Moon />} */}
                </button>
            </div>
            <Sidebar/>
            <Form/>
        </div>
    );
};

export default Home;
