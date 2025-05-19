import { useState } from "react";
import { NameGender } from "./types";

export function useGenderize() {
    const [name, setName] = useState<string>("");
    const [genderInf, setGenderInf] = useState<NameGender | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchAsk = async (nameToAsk: string) => {
        if (!nameToAsk.trim()) {
            setError("Введите имя");
            setGenderInf(null);
            return;
        }

        setError(null);

        try {
            const response = await fetch(`https://api.genderize.io?name=${nameToAsk}`);
            const data = await response.json();

            if (data.gender) {
                setGenderInf(data);
            } else {
                setError("Пол не найден");
                setGenderInf(null);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Неизвестная ошибка')
            }
            setGenderInf(null);
        } finally {
            setName("");
        }
    };

    return {
        name,
        setName,
        genderInf,
        error,
        fetchAsk,
    };
}