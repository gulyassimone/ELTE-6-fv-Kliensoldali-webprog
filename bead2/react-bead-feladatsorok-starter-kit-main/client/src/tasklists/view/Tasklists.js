import { useGetAllTaskLists, useGetAllTaskListsQuery, useGetAllTasksQuery } from "../state/tasklistSlice";
import * as React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/state/authSlice";

const Tasklists = (props) => {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetAllTaskListsQuery();
  const { handleEditedTaskList, editedTaskList } = props;
  const [tasklist, setTasklist] = useState([]);
  console.log(editedTaskList)
  useEffect(() => {
    if (data) {
      setTasklist(cloneDeep(data));
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
        width: 250,
        editable: false
      }, {
        field: "status",
        headerName: "Status",
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

  return <StyledBox>
    <DataGrid
      rows={tasklist}
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
export default Tasklists;
