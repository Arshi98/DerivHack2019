import React, { useState } from "react";
import { Grid, CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import logo from "./blogo.png";
// import ReactWOW from 'react-wow'

import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <span className="animated zoomIn"><img src={logo} alt="logo" className={classes.logotypeImage} /></span>
        
        <p className="text animated zoomInLeft" >Smart Trading Platform 
            <span className="rightAlign">Powered by DAML</span>
     
         <span className="barclay">Barclays</span> DerivHack 2019</p>
        
        {/* <Typography className={classes.logotypeText}></Typography> */}
      </div>
      

      
     
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
      
    </Grid>
  );
}

export default withRouter(Login);
