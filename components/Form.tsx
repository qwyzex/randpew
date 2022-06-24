import PasswordStrengthBar from "react-password-strength-bar";
import { useRef, useState } from "react";
import styles from "../styles/Form.module.sass";
import useLocalHistory from "../hooks/useLocalHistory";

export default function Form() {
    const [resultValue, setResultValue] = useState<string>("");
    let [copied, setCopied] = useState<boolean>(false);
    let localHistory = useLocalHistory();

    // options
    const [charactersLength, setCharactersLength] = useState<number>(8);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
    const [includeOtherCharacters, setIncludeOtherCharacters] = useState<boolean>(false);

    // prototype
    const characters: string = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharacters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers: string = "0123456789";
    const symbols: string = "!@#$%^&*()";
    const otherCharacters: string = `~\`-+[]{}\\|;:'",<.>/?`;

    // grouping
    const options = {
        charactersLength,
        includeUppercase,
        includeNumbers,
        includeSymbols,
        includeOtherCharacters,
    };

    // function
    const generate = async (e: any) => {
        let result: string = "";

        let formulaChild = {
            numbers: options.includeNumbers ? numbers : "",
            symbols: options.includeSymbols ? symbols : "",
            uppercase: options.includeUppercase ? uppercaseCharacters : "",
            other: options.includeOtherCharacters ? otherCharacters : "",
        };

        const formula =
            characters +
            formulaChild.numbers +
            formulaChild.symbols +
            formulaChild.other +
            formulaChild.uppercase.toString().replace(" ", "");

        for (let i = 0; i < charactersLength; i++) {
            result += formula[Math.floor(Math.random() * formula.length)];
        }
        setResultValue(result);

        let localPasswords = JSON.parse(localStorage.getItem("passwords")!);
        let newLocalPW = localPasswords
            ? [...localPasswords, { password: result, date: new Date() }]
            : [{ password: result, date: new Date() }];

        localStorage.setItem("passwords", JSON.stringify(newLocalPW));
        localHistory.getNewList();
    };

    // jsx
    return (
        <>
            <main className={styles.container}>
                <section className={styles.options}>
                    <h1>OPTIONS</h1>
                    <div>
                        <label>LENGTH</label>
                        <select
                            onChange={(e) => {
                                setCharactersLength(
                                    parseInt(
                                        e.target.options[e.target.selectedIndex].text
                                    )
                                );
                            }}
                        >
                            <option value={4}>4</option>
                            <option value={6}>6</option>
                            <option selected value={8}>
                                8
                            </option>
                            <option value={10}>10</option>
                            <option value={12}>12</option>
                            <option value={14}>14</option>
                            <option value={16}>16</option>
                            <option value={18}>18</option>
                            <option value={20}>20</option>
                            <option value={24}>24</option>
                            <option value={26}>26</option>
                            <option value={28}>28</option>
                            <option value={30}>30</option>
                            <option value={32}>32</option>
                            <option value={36}>36</option>
                            <option value={40}>40</option>
                            <option value={48}>48</option>
                            <option value={56}>56</option>
                            <option value={64}>64</option>
                        </select>
                    </div>
                    <div>
                        <label>INLCUDE UPPERCASE</label>
                        <input
                            type="checkbox"
                            checked={options.includeUppercase}
                            onChange={() => {
                                setIncludeUppercase(!includeUppercase);
                            }}
                        />
                    </div>
                    <div>
                        <label>INCLUDE NUMBERS</label>
                        <input
                            type="checkbox"
                            checked={options.includeNumbers}
                            onChange={() => {
                                setIncludeNumbers(!includeNumbers);
                            }}
                        />
                    </div>
                    <div>
                        <label>INCLUDE SYMBOLS</label>
                        <input
                            type="checkbox"
                            checked={options.includeSymbols}
                            onChange={() => {
                                setIncludeSymbols(!includeSymbols);
                            }}
                        />
                    </div>
                    <div>
                        <label>INCLUDE AMBIGOUS CHARACTERS</label>
                        <input
                            type="checkbox"
                            checked={options.includeOtherCharacters}
                            onChange={() => {
                                setIncludeOtherCharacters(!includeOtherCharacters);
                            }}
                        />
                    </div>
                </section>
                <hr />
                <div className={styles.resultWrapper}>
                    <input
                        readOnly
                        type="text"
                        className={styles.resultValue}
                        value={resultValue}
                        placeholder="Your Generated Password"
                    />
                    <input
                        className={styles.generateButton}
                        onClick={generate}
                        type="submit"
                        value="GENERATE"
                    />
                    <button
                        disabled={resultValue === "" ? true : false}
                        className={styles.copyButton}
                        type="button"
                        onClick={() => {
                            if (resultValue) {
                                navigator.clipboard.writeText(resultValue);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 6000);
                            }
                        }}
                    >
                        COPY
                    </button>
                    <PasswordStrengthBar
                        password={resultValue}
                        shortScoreWord="Generate First"
                        className={styles.strengthBar}
                        scoreWords={[
                            "Very Weak",
                            "Weak",
                            "Medium",
                            "Strong",
                            "Very Strong",
                        ]}
                        barColors={[
                            "grey",
                            "darkslategrey",
                            "slateblue",
                            "cadetblue",
                            "rgb(16, 140, 255)",
                        ]}
                    />
                </div>
            </main>
            <p className={`${styles.successCopyMessage} ${copied ? styles.show : ""}`}>
                COPIED!
            </p>
        </>
    );
}
