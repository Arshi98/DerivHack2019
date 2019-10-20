import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button, CircularProgress, Typography } from "@material-ui/core";
import { Menu, ExitToApp, ArrowBack, Refresh } from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles";
import { useLayoutState, useLayoutDispatch, toggleSidebar, NavigateBrokerCheck} from "../../context/LayoutContext";
import { useUserDispatch, signOut, useUserState } from "../../context/UserContext";
import { useLedgerDispatch, fetchContracts } from "../../context/LedgerContext";
import logo from "./blogo.png";

function Header({ history }) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const ledgerDispatch = useLedgerDispatch();
  var userCustomText = "";
  
 if(userState.user === "Broker1")
     userCustomText = "Executing Entity BD";
 else if(userState.user === "Broker2")
     userCustomText = "Counter Party BD";
  else 
    userCustomText = "Buyer";
  
    // local
  const [isFetching, setIsFetching] = useState(false);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(classes.headerMenuButton, classes.headerMenuButtonCollapse)}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBack
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <Menu
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          <a href="https://www.brillio.com" target="_blank">
            <img src={logo} width="75px" alt="Brillio Logo" className={classes.logTopSpace} />
          </a>
        </Typography>
        <div className={classes.grow} />
        <a className={classes.brokerCheckButton} href='*'>
          Download Report
        </a>

        <a className={classes.brokerCheckButton} href='*'>
          Broker Directory
        </a>

        <a className={classes.brokerCheckButton} href='https://brokercheck.finra.org/' target='_blank'>
          Broker Check
        </a>
        <Typography variant="h6" weight="medium">{userCustomText}</Typography>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={e => {
            fetchContracts(ledgerDispatch, userState.token, setIsFetching, () => {});
          }}
          className={classes.headerMenuButton}
        >
          {isFetching
            ? (<CircularProgress className={classes.progress} size={28} color="secondary" />)
            : <Refresh classes={{ root: classes.headerIcon }} />}
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => signOut(userDispatch, history)}
        >
          <ExitToApp classes={{ root: classes.headerIcon }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);