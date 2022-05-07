import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from './detail-task.module.scss';
import useDebounce from "../../../hooks/useDebounce";
import Task from "../../../components/Task";
import {objData} from "../../../constants/constants";

interface Props {
    data: objData[];
    handleRemove: (index: number) => void;
    onRemoveChecked: (data: objData[]) => void;
}

const DetailTask = ({data, handleRemove, onRemoveChecked}: Props) => {
    const [searchInput, setSearchInput] = useState("");
    const [checked, setChecked] = useState<string[]>([]);
    const searchValue = useDebounce(searchInput, 500);
    const [sortData, setSortData] = useState(data?.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));

    const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }, []);

    const handleChecked = useCallback((isChecked: boolean, dataId: string) => {
        if (isChecked) {
            setChecked([...checked, dataId]);
        }
        if (!isChecked) {
            const newChecked = [...checked].filter((i) => i !== dataId);
            setChecked(newChecked);
        }
    }, [checked]);

    const handleRemoveChecked = useCallback(() => {
        const newData = [...data];
        for (const id of checked) {
            newData.splice(newData.findIndex((i) => i.id.toString() === id), 1);
        }
        onRemoveChecked(newData);
        setChecked([]);
    }, [checked, data, onRemoveChecked]);

    useEffect(() => {
        const oldData = data?.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        if (searchValue) {
            const newData = oldData.filter((i) => i?.name?.toLowerCase()?.includes(searchValue.toString().toLowerCase()));
            setSortData(newData);
        }
        if (searchValue === "") {
            setSortData(data?.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
        }
    }, [data, searchValue])

    return (
        <div className={styles.container}>
            <p className={styles.title}>To Do List</p>
            <div className={styles.detailBoxContainer}>
                <input type={"search"} className={styles.searchInput} value={searchInput}
                       placeholder={"Search...."}
                       onChange={handleChangeInput}/>
                {sortData.map((obj, index) => {
                    return <Task child={obj} key={index}
                                 checked={checked}
                                 onRemove={() => handleRemove(data.findIndex((i) => i.name === obj.name))}
                                 onChecked={(value) => handleChecked(value, obj.id.toString())}/>
                })}
            </div>
            <div className={styles.bulkActionContainer}>
                <p className={styles.text}>Bulk Action:</p>
                <div className={styles.buttonContainer}>
                    <button type={"button"} className={styles.buttonDone} disabled={!checked.length}>Done</button>
                    <button type={"button"} className={styles.buttonRemove} onClick={handleRemoveChecked}
                            disabled={!checked.length}>Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailTask;