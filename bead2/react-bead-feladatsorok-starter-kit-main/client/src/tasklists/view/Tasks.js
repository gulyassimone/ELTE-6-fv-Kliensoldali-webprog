import { useGetAllTaskListsQuery, useGetAllTasksQuery } from "../state/tasklistSlice";
import * as React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/state/authSlice";

const Tasks = (props) => {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetAllTasksQuery();
  const [task, setTasks] = useState([]);
  const { selectedTask, handleSelectedTask } = props;

  useEffect(() => {
    if (data) {
      setTasks(cloneDeep(data));
    }
  }, [data]);

  function renderSelectedButton(params: GridRenderCellParams<number>) {
    if (!user) {
      return "";
    }

    return selectedTask.find((elem) => elem.id === params.row.id && user.id === elem.userId) ?
      <Button variant="contained"  color="success" onClick={() => handleSelectedTask(params.row.id, false, user.id)}>Selected</Button> :
      <Button variant="contained" onClick={() => handleSelectedTask(params.row.id, true, user.id)}>Select</Button>;

  }

  const columns: GridColumns = [
      {
        field: "title",
        headerName: "Title",
        width: 250,
        editable: false
      },
      {
        field: "description",
        headerName: "Description",
        width: 250,
        editable: false
      },
      {
        field: "createdAt",
        headerName: "created at",
        width: 250,
        editable: false
      },
      {
        field: "selectedTask",
        headerName: "Selected",
        width: 110,
        renderCell: renderSelectedButton,
        valueGetter: (params: GridValueGetterParams) => {
          return user && selectedTask.find((elem) => elem.id === params.row.id && elem.userId === user.id);
        }
      }
    ]
  ;

  return <StyledBox>
    <DataGrid
      rows={task}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      experimentalFeatures={{ newEditingApi: true }}
    />
  </StyledBox>;
};

const StyledBox = styled(Box)(() => ({
  height: 400,
  width: "100%",
  "& .error": {
    backgroundColor: `rgb(126, 10, 15, 0.1)`,
    color: "#750f0f"
  },
  "& .required": {
    backgroundColor: "#E0FFFD"
  },
  "& .notRequired": {
    backgroundColor: "#00000"
  }
}));
export default Tasks;
