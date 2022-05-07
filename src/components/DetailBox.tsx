import React, {useCallback, useEffect, useState} from 'react';
import {objData, optionsSelect} from '../constants/constants';
import styles from './detail-box.module.scss';

interface Props {
    type: "add" | "update";
    placeholder?: string;
    data?: objData;
    submit?: (e: any) => void
}

const DetailBox = ({type, placeholder, data, submit}: Props) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>("Normal");
    const [inputValue, setInputValue] = useState<string | undefined>("");
    const [textareaValue, setTextareaValue] = useState<string | undefined>("");
    const [datePicker, setDatePicker] = useState<string | undefined>(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        if (!!data) {
            setInputValue(data?.name);
            setTextareaValue(data?.description);
            setDatePicker(data?.dueDate);
            setSelectedValue(data?.priority);
        }
    }, [data])

    const handleSubmit = useCallback((e: any) => {
        if (submit && type === 'add') {
            submit(e);
            setSelectedValue("Normal");
            setInputValue("");
            setTextareaValue("");
            setDatePicker(new Date().toISOString().split("T")[0]);
        }
        if (submit && type !== 'add') {
            submit(e);
        }
    },[submit, type]);
    
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    name={"name"}
                    className={styles.input} placeholder={placeholder} value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}/>
                <p className={styles.title}>Description</p>
                <textarea
                    name={"description"}
                    className={styles.textarea} value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}/>
                <div className={styles.selectBar}>
                    <div>
                        <p className={styles.title}>Due Date</p>
                        <input name={"dueDate"} type={'date'} className={styles.datePicker} value={datePicker}
                               min={new Date().toISOString().split("T")[0]}
                               onChange={(e) => setDatePicker(e.target.value)}/>
                    </div>
                    <div>
                        <p className={styles.title}>Priority</p>
                        <select
                            className={styles.select}
                            value={selectedValue}
                            name={"priority"}
                            onChange={(e) => setSelectedValue(e.target.value)}
                        >
                            {optionsSelect.map((i, index) => (
                                <option value={i} key={index}>{i}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type={"submit"} className={styles.buttonSubmit}>{type === 'add' ? 'Add' : 'Update'}</button>
            </form>
        </div>
    );
};

export default DetailBox;