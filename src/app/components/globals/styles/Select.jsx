import React, {useState} from 'react';
import './Select.scss';
/**
 * Select Component
 * @param {arr} options - arr of json:
 * ex. [{
        'value': 0,
        'label': 'default'
    }];
 */
const Select = ({options, defaultValue, title, onValueChange=()=>{}}) => {
    const [value, setValue] = useState(defaultValue);
    const handleOnSelect = (event) => {
        setValue(event.target.value);
        onValueChange(event.target.value);
    }
    return (
        <div className="user-theme-select">
            <label>{title}</label>
            <select className="select-wrapper" value={value} onChange={handleOnSelect}>
                {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
        </div>
    );
}

export default Select;