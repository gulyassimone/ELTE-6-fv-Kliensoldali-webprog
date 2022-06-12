import { useGetAllTaskListsQuery } from "../state/tasklistSlice";
import * as React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/state/authSlice";
import { InlineBox } from "./Tasks";

const Tasklists = (props) => {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetAllTaskListsQuery();
  const { handleEditedTaskList, editedTaskList } = props;
  const [tasklist, setTasklist] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    if (data) {
      setTasklist(data.filter((elem) => elem.userId === user.id));
    }
  }, [data]);

  function renderEditButton(params: GridRenderCellParams<number>) {
    if (!user) {
      return "";
    }

    if (editedTaskList) {
      return editedTaskList.id === params.row.id ?
        <Button variant="contained" color="success"
                onClick={() => handleEditedTaskList(params.row.id, false, user.id)}>Edited</Button> : "";
    } else {
      return <Button variant="contained"
                     onClick={() => handleEditedTaskList(params.row.id, true, user.id)}>Edit</Button>;
    }

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
        width: 100,
        editable: false
      }, {
        field: "status",
        headerName: "Status",
        width: 100,
        editable: false
      },
      {
        field: "createdAt",
        headerName: "created at",
        width: 100,
        editable: false
      },
      {
        field: "Task Number",
        headerName: "Task Number",
        width: 110,
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.tasks.length;
        }
      },
      {
        field: "editedTaskList",
        headerName: "Edit",
        width: 110,
        renderCell: renderEditButton,
        valueGetter: (params: GridValueGetterParams) => {
          return editedTaskList && editedTaskList.id === params.row.id;
        }
      }
    ]
  ;

  return <InlineBox>
    <StyledBox>
      <DataGrid
        rows={tasklist}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        {...data}
      />
    </StyledBox>
    {selectionModel[0] ? <TextBox>
      <Typography variant="h5" gutterBottom component="div">
        Title: {tasklist.find((elem) => elem.id === selectionModel[0]).title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Status: {tasklist.find((elem) => elem.id === selectionModel[0]).status}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {tasklist.find((elem) => elem.id === selectionModel[0]).description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Created At: {tasklist.find((elem) => elem.id === selectionModel[0]).createdAt}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Updated At: {tasklist.find((elem) => elem.id === selectionModel[0]).updatedAt}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sum
        points: {tasklist.find((elem) => elem.id === selectionModel[0]).tasks.reduce((previousValue, currentValue) => previousValue + currentValue.points,
        0)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tasks: <ul>{tasklist.find((elem) => elem.id === selectionModel[0]).tasks.map((elem,key) => <li id={key}><b>title:</b>
        {elem.title} <br /><b>descriptions</b>: {elem.description} <br /><b>notes</b>: {elem.notes}
        <br /><b>points</b>: {elem.points}
      </li>)}</ul>
      </Typography>
    </TextBox> : <></>
    }</InlineBox>;
};
const StyledBox = styled(Box)(() => ({
  height: 600,
  width: "70%",
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
const TextBox = styled(Box)(() => ({
  height: 600,
  width: "30%",
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
export default Tasklists;
