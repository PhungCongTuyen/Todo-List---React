import React from 'react';
import styles from './new-task.module.scss';
import DetailBox from "../../../components/DetailBox";

interface Props {
    handleSubmit?: (e: any) => void;
}

const NewTask = ({handleSubmit}: Props) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>New Task</p>
            <div className={styles.detailBoxContainer}>
                <DetailBox
                    type={"add"}
                    placeholder={"Add new task..."}
                    submit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default NewTask;