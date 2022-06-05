import {useGetAllTasksQuery} from "../state/tasklistSlice";

const Tasklist = () => {
    const { data: tasklist, isLoading } = useGetAllTasksQuery();
    console.log(tasklist)
    return <div>data</div>;
};

export default Tasklist;
