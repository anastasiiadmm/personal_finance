import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridItem from "../../template/Grid/GridItem.js";
import GridContainer from "../../template/Grid/GridContainer.js";
import Card from "../../template/Card/Card.js";
import CardHeader from "../../template/Card/CardHeader.js";
import CardBody from "../../template/Card/CardBody.js";
import CardFooter from "../../template/Card/CardFooter.js";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {cleanUserErrorsRequest, updateRequest} from "../../store/actions/usersActions";
import FileInput from "../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {currencies} from "../../utils";
import CardAvatar from "../../template/Card/CardAvatar";
import unknownUser from "../../assets/images/unknownUser.png";
import Primary from "../../template/Typography/Primary";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from "../../template/CustomButtons/Button";

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
  }
};

const useStyles = makeStyles(styles);

const UserProfile = () => {
  const user = useSelector(state => state.users.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    displayName: user.displayName,
    avatar: user.avatar,
    preferences: user.preferences,
    currentPassword: '',
    newPassword: ''
  });
  const [changePassword, setChangePassword] = useState(true);

  useEffect(() => {
    dispatch(cleanUserErrorsRequest());
  }, [dispatch]);


  const error = useSelector(state => state.users.updateError);
  const loading = useSelector(state => state.users.updateLoading);

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
    if (state.currentPassword && state.newPassword) {
      userData.currentPassword = state.currentPassword
      userData.newPassword = state.newPassword
    }
    if (Object.keys(userData).length !== 0 && userData.constructor === Object) {
      dispatch(updateRequest(userData));
    }
  };

  const getFieldError = fieldName => {
    let errors = undefined;
    if (error) {
      error.errors.map(prop => {
        if (prop.path === fieldName) {
          errors = prop.message
        }
      })
    }
    return errors;
  }

  return (
    <GridItem component="form" onSubmit={submitFormHandler} noValidate>
      <Card plain>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>My Profile</h4>
        </CardHeader>
        <CardBody>
          <GridContainer spacing={3}>
            <GridItem sm={4} xs={12}>
              <FileInput
                name="avatar"
                label="Avatar"
                onChange={fileChangeHandler}
                error={getFieldError('avatar')}
              >
                <CardAvatar plain>
                  {user.avatar ? <img src={user.avatar} alt="avatar"/> : <img src={unknownUser} alt="avatar"/>
                  }
                </CardAvatar>
              </FileInput>
            </GridItem>
            <GridItem sm={8} xs={12}>
              <GridContainer spacing={1} direction="column">
                <Primary>
                  Email: {user.email}
                </Primary>
                <FormElement
                  label="Display Name"
                  type="text"
                  onChange={inputChangeHandler}
                  name="displayName"
                  value={state.displayName}
                />
                <FormElement
                  label="Preferred currency"
                  value={state.preferences}
                  select
                  options={currencies}
                  onChange={inputChangeHandler}
                  name="preferences"
                />
                <FormElement
                  required
                  label="Your current password"
                  type="password"
                  value={state.currentPassword}
                  hide={changePassword}
                  onChange={inputChangeHandler}
                  name="currentPassword"
                  error={getFieldError('password')}

                />
                <FormElement
                  required
                  label="Create a new password"
                  type="password"
                  hide={changePassword}
                  onChange={inputChangeHandler}
                  value={state.newPassword}
                  name="newPassword"
                />
                {changePassword ?
                  <Button onClick={() => setChangePassword(!changePassword)} size='sm' color={"white"}>
                    <VpnKeyIcon/>Change password
                  </Button> : null}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter profile>
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
  );
}

export default UserProfile;
