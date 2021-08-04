import React, {useState} from 'react';
import Card from "../../../components/UI/Card/Card";
import CardHeader from "../../../components/UI/Card/CardHeader";
import CardBody from "../../../components/UI/Card/CardBody";
import GridContainer from "../../../components/UI/Grid/GridContainer";
import GridItem from "../../../components/UI/Grid/GridItem";
import FileInput from "../../../components/UI/Form/FileInput";
import CardAvatar from "../../../components/UI/Card/CardAvatar";
import FormElement from "../../../components/UI/Form/FormElement";
import {currencies} from "../../../utils";
import ReceiptIcon from '@material-ui/icons/Receipt';
import CardFooter from "../../../components/UI/Card/CardFooter";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-dashboard-react/components/transactionsStyle";
import {useSelector} from "react-redux";
import {apiURL} from "../../../config";
import DialogContainer from "../../../components/UI/DialogContainer/DialogContainer";
import {whiteColor} from "../../../assets/jss/material-dashboard-react";
import Success from "../../../components/UI/Typography/Success";
import Grid from "@material-ui/core/Grid";
import Button from "../../../components/UI/CustomButtons/Button";
import StyleIcon from '@material-ui/icons/Style';


const useStyles = makeStyles(styles);

const EditTransaction = ({transaction}) => {
  const classes = useStyles();
  const error = useSelector(state => state.transactions.transactionPostError);
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };


  const [state, setState] = useState({
    category: transaction?.category.name,
    cashierCheck: transaction?.cashierCheck && '',
    description: transaction?.description && '',
    date: transaction.date,
    categoryId: transaction.categoryId,
    sumIn: transaction?.sumIn && '',
    sumOut: transaction?.sumOut && '',
    accountFromId: transaction?.accountFromId && '',
    accountToId: transaction?.accountToId && '',
  });

  console.log(transaction?.description)

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
    <GridItem component="form" noValidate>
      <Card plain>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Edit Transaction</h4>
        </CardHeader>
        <CardBody>
          <GridContainer spacing={3}>
            <GridItem sm={6} xs={12} md={4}>
              {transaction.cashierCheck ?
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={6} sm={6}>
                    <CardAvatar check onClick={handleChange}>
                      <img src={apiURL + "/" + transaction.cashierCheck} alt="Cashier Check"/>
                    </CardAvatar>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FileInput
                      name="cashierCheck"
                      label="Document"
                      display={true}
                      md={12}
                      xs={12}
                      sm={12}
                      onChange={fileChangeHandler}
                    />
                  </Grid>
                  <DialogContainer style={{
                    maxWidth: '500px', backgroundColor: whiteColor,
                    boxShadow: 'none',
                  }} open={checked} handleClose={handleChange}>
                    <img src={apiURL + "/" + transaction.cashierCheck} className={classes.checkImage}
                         alt="Cashier Check"/>
                  </DialogContainer>
                </Grid> :
                <FileInput
                  name="cashierCheck"
                  sm={6}
                  label="Document"
                  display={true}
                  onChange={fileChangeHandler}
                > <CardAvatar check>  {state.cashierCheck ?
                  <Success><ReceiptIcon/></Success> :
                  <ReceiptIcon/>} </CardAvatar> </FileInput>
              }
            </GridItem>
            <GridItem sm={6} xs={12} md={8}>
              <GridContainer spacing={1} direction="column">
                <Grid item container xs={12} className={classes.criteriaContainer} alignItems="center">
                  <Button block color={'grey'}
                          inputStyled
                          disabled={true}>Type: {transaction.type} {<StyleIcon/>}</Button>
                </Grid>
                <FormElement
                  size="small"
                  label="Display Name"
                  type="text"
                  onChange={inputChangeHandler}
                  name="displayName"
                  value={state.displayName}
                />
                <FormElement
                  size="small"
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
                  size="small"
                  value={state.currentPassword}
                  // hide={changePassword}
                  onChange={inputChangeHandler}
                  name="currentPassword"
                  error={getFieldError('password')}

                />
                <FormElement
                  required
                  label="Create a new password"
                  type="password"
                  size="small"
                  // hide={changePassword}
                  onChange={inputChangeHandler}
                  value={state.newPassword}
                  name="newPassword"
                />
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter profile>
          <ButtonWithProgress
            type="submit"
            fullWidth
            color="primary"
            // loading={loading}
            // disabled={loading}
          >
            Update profile
          </ButtonWithProgress>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default EditTransaction;