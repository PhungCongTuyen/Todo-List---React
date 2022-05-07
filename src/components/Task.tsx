import React, {useState} from 'react';
import styles from './task.module.scss';
import {objData} from "../constants/constants";
import DetailBox from "./DetailBox";

interface Props {
    child: objData;
    onRemove: () => void;
    onChecked: (value: boolean) => void;
    checked: string[];
}

const Task = ({child, onRemove, onChecked, checked}: Props) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.checkboxLabel}>
                    <input type={"checkbox"} className={styles.checkbox} onChange={(e) => onChecked(e.target.checked)}
                           checked={checked.includes(String(child.id))}/>
                    <span className={styles.text}>{child.name}</span>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.buttonDetail} onClick={() => setVisible(!visible)}>Detail</button>
                    <button className={styles.buttonRemove} onClick={onRemove}>Remove</button>
                </div>
            </div>
            {visible &&
                <div className={styles.detailBoxContainer}>
                    <DetailBox type={"update"} data={child}/>
                </div>
            }
        </>
    );
};

export default Task;