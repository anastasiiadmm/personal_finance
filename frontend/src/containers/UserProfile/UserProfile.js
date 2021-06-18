import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridItem from "../../template/Grid/GridItem.js";
import GridContainer from "../../template/Grid/GridContainer.js";
import Card from "../../template/Card/Card.js";
import CardHeader from "../../template/Card/CardHeader.js";
import CardBody from "../../template/Card/CardBody.js";
import CardFooter from "../../template/Card/CardFooter.js";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import FormElement from "../../components/UI/Form/FormElement";
import {registerRequest, updateRequest} from "../../store/actions/usersActions";
import FileInput from "../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {currencies} from "../../utils";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const UserProfile = () => {
  const user = useSelector(state => state.users.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    displayName: user.displayName,
    avatar: user.avatar,
    preferences: user.preferences
  });


  const error = useSelector(state => state.users.registerError);
  const loading = useSelector(state => state.users.registerLoading);

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setState(prev => ({...prev, [name]: value}));
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setState(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

  const submitFormHandler = e => {
    e.preventDefault();
    let userData = {};

    if (state.displayName !== user.displayName) {
      userData.displayName = state.displayName
    }
    if (state.avatar !== user.avatar) {
      userData.avatar = state.avatar
    }
    if (state.preferences !== user.preferences) {
      userData.preferences = state.preferences
    }
    if (Object.keys(userData).length !== 0 && userData.constructor === Object) {
      dispatch(updateRequest(userData));
    }
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  }

  return (
    <div>
      <Grid container component="form" onSubmit={submitFormHandler}
            noValidate>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Grid spacing={3} container direction="column">
                    <FormElement
                      required
                      label="Email"
                      type="text"
                      disabled
                      onChange={inputChangeHandler}
                      name="email"
                      value={user.email}
                      autoComplete="new-email"
                      error={getFieldError('email')}
                    />
                    <FormElement
                      required
                      label="Display Name"
                      type="text"
                      onChange={inputChangeHandler}
                      name="displayName"
                      value={state.displayName}
                      error={getFieldError('displayName')}
                    />
                    <FormElement
                      required
                      label="Preferred currency"
                      value={state.preferences}
                      select
                      options={currencies}
                      onChange={inputChangeHandler}
                      name="preferences"
                      error={getFieldError('preferences')}
                    />
                    <Grid item xs>
                      <FileInput
                        name="avatar"
                        label="Avatar"
                        onChange={fileChangeHandler}
                        error={getFieldError('avatar')}
                      />
                    </Grid>
                  </Grid>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <ButtonWithProgress
                type="submit"
                fullWidth
                color="primary"
                loading={loading}
                disabled={loading}
              >
                Update profile
              </ButtonWithProgress>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}

export default UserProfile;
