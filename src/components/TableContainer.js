
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  defaultColumn,
} from "react-table";
import { GlobalFilter, DefaultFilterForColumn } from "./filter";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    // console.log(indeterminate);
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);


  return (
    <div class="cb action">
      <label>
        <input type="checkbox" ref={resolvedRef} {...rest} />
        <span>All</span>
      </label>
    </div>
  );
});

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    state,
    visibleColumns,
    getToggleHideAllColumnsProps,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultFilterForColumn },
    },
    useFilters,
    useGlobalFilter
  );

  console.log(headerGroups)
  const [wns, setWns] = useState();
  const a = []

  useEffect(() => {
  rows.map((result, item) =>{
    // console.log("********",result.original.Slack)
    a.push(result.original.Slack)
    
  })
  // console.log(a)
  setWns(Math.min(...a))
 },[rows])

 const [tns,setTns] = useState();
const b=[];
var c =0

useEffect(()=>{
  rows.map((res,item)=>{
    // console.log('#####',res.original.Slack)
    b.push(res.original.Slack)
  })
  // console.log(b)
  for(var i = 0; i < b.length; i++) {
    if(b[i] < 0) {
      c += b[i];
      // console.log(c)
    }else{
      console.log(b)
      
      
    }
  }
  setTns(c)

})

const [pvs,setPvs] = useState();
const d=[];
const e=[];
// const f=e.length()
useEffect(()=>{
  rows.map((res,item)=>{
   
    // console.log('%%%',res.original.Slack)
    d.push(res.original.Path, res.original.Slack)
  })
  // console.log('////////',d)
  for(var i=0; i< d.length;i++){
    if(d[i+1]<0){
      e.push(d[i])
    }
    else{
      // console.log(e)
    }
  }
setPvs(e.length)
})




  // rows.filter(wns => wns.original.Slack )
  // let result = wns.reduce((result, item) => {
  //   let minRes = result.length ? result[0].rest : item.Slack;
  //   if (item.rest < minRes) {
  //     minRes = item.rest;
  //     result.length = 0;
  //   }
  //   if (item.rest === minRes) {
  //     result.push(item);
  //   }
  //   return minRes;
  // }, []);
  // console.log(result)

  return (
    <>
      <div style={{ display: "flex", border: "1px solid", height: "45px" }}>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
        </div>

        {allColumns.map((column) => (
          <div class="cb action" key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              <span>{column.Header}</span>
            </label>
          </div>
        ))}
        <br />
      </div>
      {/* Table Start */}
      <table {...getTableProps()} style={{ top: "40%" }}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              <div style={{ border: "1px solid", width: "20%" }}>
                <h3>WNS: {wns}</h3>
                <h3>TNS: {tns} </h3>
                <h3>PVS: {pvs}</h3>
              </div>
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Rendering Default Column Filter */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Table End */}
    </>
  );
};

export default Table;
