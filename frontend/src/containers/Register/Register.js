import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import {Avatar, Container, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {registerRequest} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/Form/FileInput";

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

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
    displayName: '',
    avatar: null,
  });

  const error = useSelector(state => state.users.registerError);
  const loading = useSelector(state => state.users.registerLoading);

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prev => ({...prev, [name]: value}));
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setUser(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

  const submitFormHandler = e => {
    e.preventDefault();

    dispatch(registerRequest({...user}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  }

  return (
    <Container component="section" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.header}>
          Sign up
        </Typography>
        <Grid container spacing={1} direction="column" component="form" onSubmit={submitFormHandler} noValidate>
          <FormElement
            required
            label="Email"
            type="text"
            onChange={inputChangeHandler}
            name="email"
            value={user.email}
            autoComplete="new-email"
            error={getFieldError('email')}
          />
          <FormElement
            required
            label="Password"
            type="password"
            onChange={inputChangeHandler}
            name="password"
            value={user.password}
            autoComplete="new-password"
            error={getFieldError('password')}
          />
          <FormElement
            required
            label="Display Name"
            type="text"
            onChange={inputChangeHandler}
            name="displayName"
            value={user.displayName}
            error={getFieldError('displayName')}
          />
          <Grid item xs>
            <FileInput
              name="avatar"
              label="Avatar"
              onChange={fileChangeHandler}
              error={getFieldError('avatar')}
            />
          </Grid>
          <Grid item xs>
            <ButtonWithProgress
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              loading={loading}
              disabled={loading}
            >
              Sign up
            </ButtonWithProgress>
          </Grid>
          <Grid item container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;