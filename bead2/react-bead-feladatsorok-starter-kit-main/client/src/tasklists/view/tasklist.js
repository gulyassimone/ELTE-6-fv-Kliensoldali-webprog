import { useGetAllTasksQuery } from "../state/tasklistSlice";
import * as React from "react";
import { DataGrid, GridColumns,  } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { StatusEditInputCell } from "./StatusEditInputCell";
import { useDispatch } from "react-redux";
import { DataGridProps } from "@mui/x-data-grid";


const Tasklist = () => {
  const { data, isLoading } = useGetAllTasksQuery();
  const dispatch = useDispatch()
  const [tasklist, setTasklist] = useState([]);
  useEffect(() => {
    if (data) {
      setTasklist(data.map((elem) => elem));
    }
  }, [data]);


  function renderStatus(params: GridRenderCellParams<number>) {
    const status = tasklist.find((elem) => elem.id === params.row.id)?.status;
    return <TextField readOnly value={status} />;
  }

  const renderStatusInputCell: GridColDef["renderCell"] = (params) => {
    const { id, row } = params;
    const status = tasklist.find((elem) => elem.id === row.id)?.status;
    return <>
      <StatusEditInputCell handlePassData={handlePassData} id={id} value={status} />
    </>;
  };
  const handlePassData = (id: number, status: string) => {
    setTasklist(tasklist.map((elem) => {
      return elem.id === id ? {
        id: elem.id,
        title: elem.title,
        description: elem.description,
        status: status,
        createdAt: elem.createdAt
      } : elem;
    }));
    console.log(tasklist)
  };
  const columns: GridColumns = [
      {
        field: "title",
        headerName: "Title",
        width: 250,
        editable: true
      },
      {
        field: "description",
        headerName: "Description",
        width: 250,
        editable: true
      }, {
        field: "status",
        headerName: "Status",
        width: 250,
        editable: true,
        renderCell: renderStatus,
        renderEditCell: renderStatusInputCell
      },
      {
        field: "createdAt",
        headerName: "created at",
        width: 250,
        editable: false
      }
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
