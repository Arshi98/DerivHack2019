import React, { useState } from "react";
import { Grid, CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./blogo.png";
import daml from "./daml_logo.png";
import barclays1 from "./barclays1.png";
import secure from "./secure.png";
import client from "./client.png";
import broker from "./broker.png"; 
import useStyles from "./styles"; 

// import { ReceiptTwoTone } from "@material-ui/icons";

import { useUserDispatch, loginUser } from "../../context/UserContext";

    function Landingpage(props) {
      var classes = useStyles();
    
      // global
      var userDispatch = useUserDispatch();
    
      // local
      var [isLoading, setIsLoading] = useState(false);
      var [error, setError] = useState(null);
      var [loginValue, setLoginValue] = useState("");
      var [passwordValue] = useState("");
    
      return(
        <div className="wrapper">
        
          <header className="animated slideInDown">
              <span className="logo"><img src={logo} alt="Brillio logo" width="80px"/></span>
            <p className="subLogo">Smart trading Platform
              <span className="leftAlign">Powered by </span><span className="leftAlign"><img src={daml} alt=" logo" width="40px"/></span>
            </p>
            <p className="rightAlign"><span className="logo"><img src={barclays1} alt="logo" width="180px"/></span>DerivHack 2019</p> 
          </header>
          <nav>
            <ul className=" animated slideInLeft">
              <li>ABOUT US</li>
              <li>NEW TO INVESTING</li>
              <li>TRADING</li>
              <li>INVESTMENT CHOICES</li>
              <li>PRICING</li>
              <li>KEY INSIGHTS</li>
              <li>CONTACT US</li>
              <li>CHAT</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li>REGISTER</li>
            </ul>
            {/* <ul className="register animated slideInRight">
            <li className="ant-dropdown-link" href="#">
              REGISTER
              </li>
              </ul> */}
          </nav>

          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="content">
                  <ul className="mainList">
                    <li className=" animated fadeIn delay-1s"><span className="head"><img src={client} alt="client" width="80px"/></span>
                        <ul className="innerList">
                          <li><a href="www.google.com">- Evaluate your Broker</a></li>
                          <li><a href="#">- Investing your way</a></li>
                    
                        </ul>
                    </li>
                    <li className=" animated fadeIn delay-2s"><span className="head"><img src={broker} alt="broker" width="80px"/></span>
                        <ul className="innerList">
                          <li><a href="#">- Know the guidelines</a></li>
                          <li><a href="#">- Identify counterparties</a></li>
                          
                  </ul>
                    </li>
                    <li className=" animated fadeIn delay-3s"><span className="head"><img src={secure} alt="secure" width="80px"/></span>
                        <ul className="innerList">
                          <li><a href="https://ipfs.io/ipfs/QmXGN5tdg8bfZCLD6YZUsFRi4xXuHn7tbEBaezcwe6KaUc" target='_blank'>- IPFS</a></li>
                          <li><a href="#"></a></li>
                        </ul>
                    </li>

                  </ul>
                </div>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <div className={classes.loginModule}>
                  <div className={classes.formContainer}>
                    <div className={classes.form}>
                        <React.Fragment>
                          <Fade in={error}>
                            <Typography color="secondary" className={classes.errorMessage}>
                              Something is wrong with your login or password :(
                            </Typography>
                          </Fade>
                          <TextField
                            id="email"
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            value={loginValue}
                            onChange={e => setLoginValue(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                loginUser(
                                  userDispatch,
                                  loginValue,
                                  passwordValue,
                                  props.history,
                                  setIsLoading,
                                  setError,
                                )
                              }
                            }}
                            margin="normal"
                            placeholder="Please enter the party name"
                            type="email"
                            fullWidth
                            className="animated zoomIn"
                          />
                          <div className={classes.formButtons}>
                            {isLoading ? (
                              <CircularProgress size={26} className={classes.loginLoader} />
                            ) : (
                              <Button
                                disabled={loginValue.length === 0}
                                onClick={() =>
                                  loginUser(
                                    userDispatch,
                                    loginValue,
                                    passwordValue,
                                    props.history,
                                    setIsLoading,
                                    setError,
                                  )
                                }
                                variant="contained"
                                color="primary"
                                size="large"
                              >
                                Login
                              </Button>
                            )}
                          </div>
                        </React.Fragment>
                    </div>
                  </div>
                </div>  
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </div>
        </div>  

);
}


export default withRouter(Landingpage);
