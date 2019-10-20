import React, { useState } from "react";
import ReactJson from "react-json-view";
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import { useStyles } from "./styles";
import config from "../../config";
 
export default function Contracts({ contracts, columns, actions=[] }) {
  actions = actions ? actions : [];
  const isDefault = !columns;
  columns = columns ? columns : (config.isLocalDev
    ? [ [ "Module", "templateId.moduleName" ], [ "Template", "templateId.entityName" ], [ "ContractId", "contractId" ] ]
    : [[ "Template", "templateId" ], [ "ContractId", "contractId" ] ]);

  const classes = useStyles();
  var [state] = useState({});
  var userinfo = ""
  var btnLabel = "";
  
  function getByPath(data, path) {
    if (path.length === 0) return data;
    if (data[path[0]] === undefined) throw new Error("Object doesn't have key '" + path[0] + "': " + JSON.stringify(data));
    const value = getByPath(data[path[0]], path.slice(1));
    return value;
  }

  function getValue(data, path) {
    const split = typeof path === "string" && path !== "" ? path.split(".") : [];
    getButtonAction(getByPath(data, split));
    return getByPath(data, split);
  }


  function getButtonAction(data) {
    userinfo = localStorage.getItem("daml.user")
    
    if(data === "Execution") {
      if(userinfo === "Broker1" || userinfo === "Broker2")
       btnLabel = "Allocate";
      else 
       btnLabel = "";
     } else if(data === "Allocation") {
       if(userinfo === "Client1" || userinfo === "Client2" || userinfo === "Client3" || userinfo === "Client4" || userinfo === "Client5"
       || userinfo === "Client6"|| userinfo === "Client7"|| userinfo === "Client8"|| userinfo === "Client9"|| userinfo === "Client10")
       btnLabel = "Affirmation";
       else 
       btnLabel = "";
     } else if(data === "Affirm") {
       if(userinfo === "Broker1" || userinfo === "Broker2")
       btnLabel = "Confirm";
       else 
       btnLabel = "";
     } else if(data === "Confirm") {
      if(userinfo === "Broker1" || userinfo === "Broker2")
      btnLabel = "Settlement";
      else 
      btnLabel = "";
    } else if(data === "Settlement") {
      if(userinfo === "Client1" || userinfo === "Client2" || userinfo === "Client3" || userinfo === "Client4" || userinfo === "Client5"
       || userinfo === "Client6"|| userinfo === "Client7"|| userinfo === "Client8"|| userinfo === "Client9"|| userinfo === "Client10")
        btnLabel = "Collateral";
      else 
        btnLabel = "";
    } else if(data === "ColletralLocked") {
      if(userinfo === "Client1" || userinfo === "Client2" || userinfo === "Client3" || userinfo === "Client4" || userinfo === "Client5"
        || userinfo === "Client6"|| userinfo === "Client7"|| userinfo === "Client8"|| userinfo === "Client9"|| userinfo === "Client10")
        btnLabel = "UnLock";
      else 
        btnLabel = "";
    } else if(data === "ColletralUnLocked") {
      btnLabel = "";
    }
    
  }

  return (
    <>
      <Grid container spacing={4} className={classes.contractsGrid}>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.tableRow}>
              { columns.map(col =>    (<TableCell className={classes.tableCell} key={col[0]}>{col[0]}</TableCell>)) }
              { isDefault ?           (<TableCell className={classes.tableCell} key="argument">Argument</TableCell>) : <></>}
              { actions.map(action => (<TableCell className={classes.tableCell} key={action[0]}>{action[0]}</TableCell>)) }
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((c, i) => (
              <TableRow key={i} className={classes.tableRow}>
                { columns.map(col => (<TableCell key={col[0]} className={classes.tableCell}>{getValue(c, col[1])}</TableCell>)) }
                { isDefault
                    ? (<TableCell key="argument" className={classes.tableCell}>
                        <ReactJson src={c.argument} name={false} collapsed={true} enableClipboard={false}/>
                      </TableCell>)
                    : <></> }
                { actions.map(action => (
                  <TableCell key={action[0]} className={classes.tableCell}>
                    { btnLabel === ""
                        ?
                        <></>
                        :
                          <Button
                            color="primary"
                            size="small"
                            className="px-2"
                            variant="contained"
                            onClick={() => action[1](c, state[action[2]])}
                          >
                            {btnLabel}
                          </Button>
                      }
                    </TableCell>)
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Grid>
      </Grid>
    </>
  );
}
