import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, styled, TextField } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { number } from "prop-types";
import { useEffect, useState } from "react";

const EditedTasklist = (props) => {
  const { editedTaskList } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  }, [editedTaskList]);

  return (<>
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
            label="Tasklist name"
          />
          <TextField
            required
            id="outlined-disabled"
            label="Status"
          />
          <TextField
            required
            id="outlined-password-input"
            label="Describe"
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Create At"
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Edited At"
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Summary"
            InputProps={{
              readOnly: true
            }}
          />
        </div>
      </Box>
      <StyledBox>
        <DataGrid
          rows={data}
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
    </>
  );
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
    field: "note",
    headerName: "Note",
    width: 250,
    editable: true
  },
  {
    field: "point",
    headerName: "Point",
    type: number,
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