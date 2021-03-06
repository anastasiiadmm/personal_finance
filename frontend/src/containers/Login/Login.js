import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import {Link as RouterLink} from "react-router-dom";
import {Avatar, Container, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import GoogleLogin from "../../components/UI/GoogleLogin/GoogleLogin";
import {cleanUserErrorsRequest, loginRequest} from "../../store/actions/usersActions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  header: {
    marginBottom: theme.spacing(2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.loginError);
  const loading = useSelector(state => state.users.loginLoading);
  const [user, setUser] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    dispatch(cleanUserErrorsRequest());
  }, [dispatch]);

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();
    dispatch(loginRequest({...user}));
  };

  return (
    <Container component="section" maxWidth="xs">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.header}>
          Sign in
        </Typography>
        <Grid container spacing={1} direction="column" component="form" onSubmit={submitFormHandler}>
          {error && (
            <Grid item xs>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error.message || error.global}
              </Alert>
            </Grid>
          )}
          <FormElement
            label="Email"
            type="email"
            autoComplete="current-email"
            onChange={inputChangeHandler}
            name="email"
            value={user.email}
          />
          <FormElement
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={inputChangeHandler}
            name="password"
            value={user.password}
          />
          <Grid item xs>
            <ButtonWithProgress
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              id="signin-button"
              loading={loading}
              disabled={loading}
            >
              Sign in
            </ButtonWithProgress>
          </Grid>
          <Grid item xs>
            <GoogleLogin>Sign in with Google</GoogleLogin>
          </Grid>
          <Grid item container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/register">
                Or sign up
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;