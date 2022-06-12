import { useGetAllTasksQuery } from "../state/tasklistSlice";
import * as React from "react";
import { DataGrid, GridColumns,  } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import cloneDeep from 'lodash/cloneDeep';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Tasklist = (props) => {
  const {data, selectedTask, handleSelectedTask} = props;
  const [tasklist, setTasklist] = useState([]);

  useEffect(() => {
    if (data) {
      setTasklist( cloneDeep(data));
    }
  }, [data]);
  function renderSelectedButton(params: GridRenderCellParams<number>) {
    return selectedTask ? selectedTask.id === params.row.id ? <Button variant="contained" onClick={() => handleSelectedTask(params.row.id, false)}>Selected</Button> : "": <Button variant="contained" onClick={() => handleSelectedTask(params.row.id, true)}>Select</Button> ;
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
      }, {
        field: "status",
        headerName: "Status",
        width: 250,
        editable: false,
      },
      {
        field: "createdAt",
        headerName: "created at",
        width: 250,
        editable: false
      },
    {
      field: 'selectedTask',
      headerName: 'Selected',
      width: 110,
      editable: true,
      renderCell: renderSelectedButton,
      valueGetter: (params: GridValueGetterParams) => {
        return selectedTask ? selectedTask.id === params.row.id:false;
      },
    },
    ]
  ;

  return <StyledBox>
    <DataGrid
      rows={tasklist}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[20]}
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
export default Tasklist;
