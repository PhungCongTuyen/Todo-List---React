export const optionsSelect = ["Low", "Normal", "High"];

export const defaultData = [{
    id: 1,
    name: "Do homework",
    description: "1",
    dueDate: "2022-05-06",
    priority: "Low",
    },
    {
        id: 2,
        name: "Do housework",
        description: "2",
        dueDate: "2022-05-07",
        priority: "High",
    },
    {
        id: 3,
        name: "Do nothing",
        description: "3",
        dueDate: "2022-05-08",
        priority: "Low",
    }
];

export interface objData {
    id: number;
    name?: string;
    description?: string;
    dueDate: string;
    priority?: string;
}