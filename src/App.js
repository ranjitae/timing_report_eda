import "./components/table.module.css";
import Table from "./components/TableContainer";
import { useMemo, useState } from "react";
import data from "./components/data.json";
import { SelectColumnFilter } from "../src/components/filter";

export default function App() {
  const [column, setColumn] = useState([]);
  const columns = useMemo(
    () => [
      Object.keys(data[0]).map((item) => {
        return setColumn((column) =>
          column.concat({
            Header: item,
            accessor: item,
            // Filter: SelectColumnFilter,
            // filter: "inNumberRange",
          })
        );
      }),
    ],

    []
  );

  console.log(column);
  return (
    <div className="App">
      <Table columns={column} data={data} />
    </div>
  );
}
