import React, { useState } from 'react';
import add from '../Logic/Calc';
import styles from '../Style/calc.module.css';

const StringCalcUI: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);
    const [error, setError] = useState("");

    const handleCalculate = () => {
        try {
            // Replace literal "\n" with actual \n
            const formattedInput = input.replace(/\\n/g, '\n');
            console.log(input, formattedInput, "input");
            const sum = add(formattedInput);
            setResult(sum);
            setError("");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                setResult(0);
            } else {
                setError("Invalid input");
                setResult(0);
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleCalculate();
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <h2 className={styles.header}>String Calculator</h2>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => (setInput(e.target.value), setError(""), setResult(0))}
                    placeholder="Enter numbers string (e.g., 1,2,3 or //;1;2)"
                    className={styles.input}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleCalculate} className={styles.button}>
                    Calculate
                </button>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.result}>
                    <span>Result: </span>
                    <strong>{result}</strong>
                </div>
            </div>
        </div>
    );
};

export default StringCalcUI;
