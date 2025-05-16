import React, { useEffect, useRef } from "react";
import { useGenderize } from "./useGenderize";

const genderLabel = {
    male: "мужской",
    female: "женский",
};

export function App() {
    const { name, setName, genderInf, error, fetchAsk } = useGenderize();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetchAsk(name);
        inputRef.current?.focus();
    };

    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "auto", padding: 20 }}>
            <h1>Genderize</h1>

            <form onSubmit={handleSubmit}>
                <input                    
                    ref={inputRef}
                    value={name}
                    placeholder="Введите имя"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />

                <button type="submit" style={{ width: "100%", padding: "8px" }}>
                    Определить пол
                </button>
            </form>
            {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}

            {genderInf && !error && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Результаты</h2>
                    <p>
                        Имя: {genderInf.name}</p>
                    <p>
                        Пол: {genderLabel[genderInf.gender] || "не определен"}
                    </p>
                </div>
            )}
        </div>
    );
}