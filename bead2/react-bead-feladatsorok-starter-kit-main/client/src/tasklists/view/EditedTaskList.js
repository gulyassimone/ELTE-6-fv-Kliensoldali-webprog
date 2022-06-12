import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, styled, TextField } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { useGetAllTaskListsQuery } from "../state/tasklistSlice";

const EditedTasklist = (props) => {
  const { editedTaskList } = props;
  const { data } = useGetAllTaskListsQuery();
  const [taskData, setTaskData] = useState();

  const handleChange = (event) =>
    setTaskData({ ...taskData, [event.target.name]: event.target.value });
  useEffect(() => {
    if (editedTaskList && data)
      setTaskData(data.find((elem) => elem.id === editedTaskList.id));
  }, [editedTaskList, data]);

  if (taskData)
    return <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" }
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Tasklist Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Describe"
            name="description"
            value={taskData.description}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-disabled"
            label="Status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
          />

          <TextField
            required
            id="outlined-read-only-input"
            label="Create At"
            InputProps={{
              readOnly: true
            }}
            name="createdAt"
            value={taskData.createdAt}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Updated At"
            InputProps={{
              readOnly: true
            }}
            name="updatedAt"
            value={taskData.updatedAt}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Summary"
            value={taskData.tasks.reduce((previousValue, currentValue) => previousValue + currentValue.points,
              0)}
          />
        </div>
      </Box>
      <StyledBox>
        <DataGrid
          rows={taskData.tasks}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button> Save </Button>
          <Button> Cancel </Button>
        </ButtonGroup>
      </StyledBox>
    </>;
};

export default EditedTasklist;
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
    field: "notes",
    headerName: "Notes",
    width: 250,
    editable: true
  },
  {
    field: "points",
    headerName: "Points",
    type: "number",
    width: 250,
    editable: true
  }
];

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