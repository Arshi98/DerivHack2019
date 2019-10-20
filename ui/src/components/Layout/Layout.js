import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import Default from "../../pages/default/Default";
import Report from "../../pages/report/Report";
import landingPage from "../../pages/landingPage/landingPage";
import SettlementReport from "../../pages/settlementReport/SettlementReport";
import TradedReport from "../../pages/tradedReport/TradedReport";
import TransHistory from "../../pages/transHistory/TransHistory";
import ErrorTrans from "../../pages/errorTrans/ErrorTrans";

function Layout(props) {
  const classes = useStyles();
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/default" component={Default} />
              <Route path="/app/report" component={Report} />
              <Route path="/app/settlementReport" component={SettlementReport} />
              <Route path="/app/tradedReport" component={TradedReport} />
              <Route path="/app/transHistory" component={TransHistory} />
              <Route path="/app/errorTrans" component={ErrorTrans} />
              <Route path="/app/landingPage" component={landingPage} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
