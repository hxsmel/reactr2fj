import React from 'react';
import styles from './Select.module.scss';
import { OptionData } from '../../types'

interface SelectProps {
    label: string;
    id: string;
    options: OptionData[];
    value: string;
    onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ label, id, options, value, onChange }) => (
    <div className={styles.selectWrapper}>
        <label htmlFor={id} className={styles.label}>{label}</label>
        <select
            id={id}
            className={styles.select}
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);