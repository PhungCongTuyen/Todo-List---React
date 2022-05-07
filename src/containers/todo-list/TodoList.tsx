import React, {useCallback, useState} from 'react';
import NewTask from "./new-task/NewTask";
import DetailTask from "./detail-task/DetailTask";
import styles from "./todo-list.module.scss";
import {defaultData, objData} from "../../constants/constants";

const TodoList = () => {
    const [testData, setData] = useState<objData[]>(defaultData)

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault();
        const ids = testData.map(user => user.id);
        const sorted = ids.sort((a, b) => a - b);
        const data = {
            id: sorted[sorted.length - 1] + 1,
            name: e.target.name.value,
            description: e.target.description.value,
            dueDate: e.target.dueDate.value,
            priority: e.target.priority.value
        }
        setData((prev) => {
            return [...prev, data];
        })
    },[testData]);

    const handleRemove = useCallback((id: number) => {
        const newData = [...testData];
        newData.splice(id, 1);
        setData(newData);
    }, [testData]);

    const handleRemoveChecked = useCallback((data: objData[]) => {
        setData(data);
    },[])

    return (
        <div className={styles.container}>
            <NewTask handleSubmit={handleSubmit}/>
            <DetailTask data={testData} handleRemove={handleRemove} onRemoveChecked={handleRemoveChecked}/>
        </div>
    );
};

export default TodoList;