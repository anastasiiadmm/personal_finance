import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridItem from "../../components/UI/Grid/GridItem.js";
import GridContainer from "../../components/UI/Grid/GridContainer.js";
import Card from "../../components/UI/Card/Card.js";
import CardHeader from "../../components/UI/Card/CardHeader.js";
import CardBody from "../../components/UI/Card/CardBody.js";
import CardFooter from "../../components/UI/Card/CardFooter.js";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {cleanUserErrorsRequest, deleteUserRequest, updateRequest} from "../../store/actions/usersActions";
import FileInput from "../../components/UI/Form/FileInput";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {currencies} from "../../utils";
import CardAvatar from "../../components/UI/Card/CardAvatar";
import unknownUser from "../../assets/images/unknownUser.png";
import Primary from "../../components/UI/Typography/Primary";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from "../../components/UI/CustomButtons/Button";
import DialogContainer from "../../components/UI/DialogContainer/DialogContainer";
import {whiteColor} from "../../assets/jss/material-dashboard-react";
import {transactionsFetchRequest} from "../../store/actions/transactionsActions";
import {groupsRequest} from "../../store/actions/groupsActions";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {apiURL} from "../../config";

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
  const transactions = useSelector(state => state.transactions.transactions.count);
  const groups = useSelector(state => state.groups.groups);

  const [check, setCheck] = useState(false);

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
    dispatch(transactionsFetchRequest());
    dispatch(groupsRequest())
  }, [dispatch]);


  const error = useSelector(state => state.users.updateError);
  const loading = useSelector(state => state.users.updateLoading);
  const [dialog, setDialog] = useState(false);


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
        return null;
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
                  {user.avatar ? <img src={apiURL + '/' + user.avatar} alt="avatar"/> :
                    <img src={unknownUser} alt="avatar"/>
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
                    Change password<VpnKeyIcon/>
                  </Button> : null}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter profile>
          <GridContainer direction="row">
            <GridItem xs={12} sm={10}>
              <ButtonWithProgress
                type="submit"
                fullWidth
                color="primary"
                loading={loading}
                disabled={loading}
              >
                Update profile
              </ButtonWithProgress>
            </GridItem>
            <GridItem xs={12} sm={2}>
              <Button
                block
                onClick={() => setDialog(!dialog)}
                color={'danger'}
              >
                Delete
              </Button>
              <DialogContainer style={{
                maxWidth: '500px', backgroundColor: whiteColor,
                boxShadow: 'none',
              }} open={dialog} handleClose={() => {
                setDialog(!dialog);
                setCheck(false);
              }}>
                <Card plain>
                  <CardHeader plain color={'danger'}>
                    <h5 className={classes.cardTitleWhite}>Terminating your Financier account?</h5>
                  </CardHeader>
                  <CardBody plain>
                    <h6>Before continuing, please consider the following</h6>
                    <p>By terminating this account, you will lose {transactions > 1 ? transactions : 'all'} transactions
                      in {groups.length > 1 ? groups.length + ' groups' : 'personal group'}.</p>
                    <p>We do not keep any personal data upon termination of your account.</p>
                    <p>You may later signup with the same Email, however your current data is terminated
                      permanently.</p>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check}
                          onChange={() => setCheck(!check)}
                          name="check"
                          color="secondary"
                        />
                      }
                      label="Are you sure you want to delete your account?"/>
                  </CardBody>
                  <CardFooter plain>
                    <Button color={'success'} size={'sm'} onClick={() => {
                      setDialog(!dialog);
                      setCheck(false)
                    }} block>Cancel</Button>
                    <Button color={'danger'} size={'sm'} disabled={!check}
                            onClick={() => dispatch(deleteUserRequest())}
                            block>Yes</Button>
                  </CardFooter>
                </Card>
              </DialogContainer>
            </GridItem>
          </GridContainer>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

export default UserProfile;
