import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const MUITable = (rows: any) => {
  const columns: GridColDef[] = [
    {
      field: "id",
    },
    { field: "name", headerName: "name", type: "string", width: 100 },
    {
      field: "favorite_color",
      headerName: "Favorite color",
      type: "string",
      flex: 1,
    },
    {
      field: "hated_color",
      headerName: "Hated color",
      type: "string",
      flex: 1,
    },
    {
      field: "lucky_color",
      headerName: "Lucky color",
      type: "string",
      flex: 1,
    },
    {
      field: "random_color",
      headerName: "Random color",
      type: "string",
      flex: 1,
    },
  ];
  return (
    <DataGrid
      rows={rows.rows}
      columns={columns}
      pageSize={15}
      rowsPerPageOptions={[15]}
      disableSelectionOnClick
      disableColumnSelector
      disableDensitySelector
    />
  );
};
export default MUITable;
