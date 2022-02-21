import { randomUUID } from "crypto";
import { useRef, useState } from "react";

export default function Form() {
    const resultRef = useRef(null);
    const [resultValue, setResultValue] = useState("");

    // options
    const [charactersLength, setCharactersLength] = useState(8);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [includeOtherCharacters, setIncludeOtherCharacters] = useState(false);

    // prototype
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()";
    const otherCharacters = `~\`-+[]{}\\|;:'",<.>/?`;

    const options = {
        charactersLength,
        includeUppercase,
        includeNumbers,
        includeSymbols,
        includeOtherCharacters,
    };

    const generate = async (e: any) => {
        let result: string = "";

        let formulaChild = {
            numbers: options.includeNumbers ? numbers : "",
            symbols: options.includeSymbols ? symbols : "",
            uppercase: options.includeUppercase ? uppercaseChar : "",
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
    };

    return (
        <main>
            <section>
                <div>
                    <label>LENGTH</label>
                    <select
                        onChange={(e) => {
                            setCharactersLength(
                                parseInt(e.target.options[e.target.selectedIndex].text)
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
            <div>
                <input onClick={generate} type="submit" value="GENERATE" />
                <input
                    ref={resultRef}
                    readOnly
                    type="text"
                    value={resultValue}
                    placeholder="Your Generated Password Will Appear Here"
                />
                <button
                    type="button"
                    onClick={() => {
                        resultValue && navigator.clipboard.writeText(resultValue);
                    }}
                >
                    COPY
                </button>
            </div>
        </main>
    );
}
