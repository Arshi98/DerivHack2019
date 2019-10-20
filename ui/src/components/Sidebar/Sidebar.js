import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import { Home, List as ListIcon, ArrowBack } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'; 
import HistoryIcon from '@material-ui/icons/History';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBack
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        <SidebarLink
          key="default"
          label="Active Transactions"
          path="/app/default"
          icon={(<Home />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
        <SidebarLink
          key="Report"
          label="Pending Workflows"
          path="/app/report"
          icon={(<ListIcon />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
        <SidebarLink
          key="SettlementReport"
          label="Settled Position"
          path="/app/settlementReport"
          icon={(<AssignmentTurnedInIcon />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
        <SidebarLink
          key="TradedReport"
          label="Traded Position"
          path="/app/tradedReport"
          icon={(<AssessmentIcon />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
        <SidebarLink
          key="TransHistory"
          label="Transaction History"
          path="/app/transHistory"
          icon={(<HistoryIcon />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
        <SidebarLink
          key="ErrorTrans"
          label="Error Transactionsactions"
          path="/app/errorTrans"
          icon={(<ErrorOutlineIcon />)}
          location={location}
          isSidebarOpened={isSidebarOpened}
        />
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
