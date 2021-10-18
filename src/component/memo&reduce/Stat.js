import React, { useMemo, useState, useEffect } from "react";
import RenderColor from "../../component/RenderColor";
import Table from "react-bootstrap/Table";

const Stat = (props) => {
  const tableData = props.data;

  return (
    <>
      <RenderColor />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Pollitos bebes</th>
            <th>Pollitos adultos</th>
            <th>Vendidos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            [tableData].map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.little}</td>
                  <td>{item.adult}</td>
                  <td>{item.sale}</td>
                  <td>{item.total}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <p>Calculate: {JSON.stringify(tableData)}</p>
    </>
  );
};

export const StatMemo = React.memo(Stat);
export default Stat;
