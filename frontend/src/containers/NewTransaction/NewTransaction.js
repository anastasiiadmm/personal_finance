import React, {useRef, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Dialog, InputAdornment} from "@material-ui/core";
import Card from "../../template/Card/Card";
import CardHeader from "../../template/Card/CardHeader";
import CardFooter from "../../template/Card/CardFooter";
import styles from "../../assets/jss/material-dashboard-react/views/newTransactionStyle";
import GridItem from "../../template/Grid/GridItem";
import GridContainer from "../../template/Grid/GridContainer";
import {animated, useSpring} from "react-spring";
import Button from "../../template/CustomButtons/Button";
import {useDispatch, useSelector} from "react-redux";
import CardBody from "../../template/Card/CardBody";
import FileInput from "../../components/UI/Form/FileInput";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {transactionPost} from "../../store/actions/transactionsActions";

const useStyles = makeStyles(styles);


const NewTransaction = ({handleClose, open, type}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.transactions.transactionPostError);
  const loading = useSelector(state => state.transactions.transactionPostLoading);
  let accounts = useSelector(state => state.accounts.accounts);
  const user = useSelector(state => state.users.user);
  const categories = useSelector(state => state.categories.categories);

  const categoryByType = categories.filter(obj => {
    return obj.categoryType === type
  });


  const [animationStatus, setAnimationStatus] = useState(false);

  const accountFromId = useRef('')
  const accountToId = useRef('');
  const sum = useRef('');
  const categoryId = useRef('');
  const description = useRef('');
  let cashierCheck = '';


  const primaryProps = useSpring({
    opacity: 1,
    reset: animationStatus,
    from: {
      opacity: 1,
      transform: 'translateX(150px)'
    },
    to: {
      transform: 'translateX(0)'
    },
  });


  const secondaryProps = useSpring({
    opacity: 1,
    reset: animationStatus,
    transform: 'translateX(-15px)',
    from: {
      opacity: 0,
      transform: 'translateX(-50px)'
    }
  });

  const fileChangeHandler = e => {
    cashierCheck = e.target.files[0];
  };

  const submitFormHandler = async e => {
    e.preventDefault();
    const transaction = {};

    if (cashierCheck !== '') {

      transaction.cashierCheck = cashierCheck;
    }
    if (description.current !== null) {
      transaction.description = description.current.value;
    }
    transaction.categoryId = categoryId.current.value;
    transaction.accountToId = accountToId.current.value;
    transaction.sumIn = sum.current.value;
    transaction.accountFromId = accountFromId.current.value;
    transaction.sumOut = sum.current.value;
    transaction.type = type;
    await dispatch(transactionPost(transaction))
    handleClose()

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
    <div>
      <Dialog
        maxWidth={'lg'}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '100%'
          },
        }} open={open} onClose={handleClose}>

        <Grid container justify="center" alignItems="stretch" component="form"
              onSubmit={submitFormHandler}>
          <GridItem xs={6}>
            <animated.div style={primaryProps} className={classes.animation}>
              <Card>
                <CardHeader>
                  <h3 className={classes.cardTitle}>
                    Add {type}
                  </h3>
                </CardHeader>
                <CardBody plain>
                  <GridContainer spacing={1} direction="column">
                    {type === 'expenditure' ? <FormElement
                      label="From account"
                      select
                      inputRef={accountFromId}
                      defaultValue=''
                      required
                      options={accounts}
                    /> : null}
                    {type === 'income' ? <FormElement
                      label="To account"
                      select
                      required
                      inputRef={accountToId}
                      defaultValue=''
                      options={accounts}
                    /> : null}
                    {type === 'transfer' ? <GridContainer spacing={1}>
                      <Grid item xs={12} md={6}>
                        <FormElement
                          label="From account"
                          select
                          inputRef={accountFromId}
                          defaultValue=''
                          required
                          options={accounts}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormElement
                          label="To account"
                          select
                          required
                          inputRef={accountToId}
                          defaultValue=''
                          options={accounts}
                        />
                      </Grid>
                    </GridContainer> : null}
                    <FormElement
                      label="Category"
                      select
                      required
                      defaultValue=''
                      inputRef={categoryId}
                      options={type === 'transfer' ? categories : categoryByType}
                    />
                    <FormElement
                      label="Amount"
                      type="number"
                      required
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{user.preferences}</InputAdornment>,
                      }}
                      inputRef={sum}
                      defaultValue=''
                    />
                    <Grid item xs>
                      <Button disabled={animationStatus} block size={'sm'} color={'info'}
                              onClick={() => setAnimationStatus(v => !v)}>Add
                        description</Button>
                    </Grid>
                  </GridContainer>
                </CardBody>
                <CardFooter plain>
                  <ButtonWithProgress
                    type="submit"
                    fullWidth
                    color={'success'}
                    size={'sm'}
                    loading={loading}
                    disabled={loading}
                  >
                    Add transaction
                  </ButtonWithProgress>
                </CardFooter>
              </Card>
            </animated.div>
          </GridItem>
          {animationStatus ?
            <GridItem xs={6}>
              <animated.div style={secondaryProps} className={classes.animation}>
                <Card>
                  <CardHeader>
                    <h3 className={classes.cardTitle}>
                      Description
                    </h3>
                  </CardHeader>
                  <CardBody plain>
                    <GridContainer spacing={1} direction="column">
                      <Grid item xs>
                        <FileInput
                          name="cashierCheck"
                          label="Document"
                          onChange={fileChangeHandler}
                          error={getFieldError('cashierCheck')}
                        />
                      </Grid>
                      <FormElement
                        label="Description"
                        type="text"
                        inputRef={description}
                        defaultValue=''
                        multiline
                        rows={7}
                      />
                    </GridContainer>
                  </CardBody>
                  <CardFooter plain>
                    <Button color={'danger'} size={'sm'} block
                            onClick={() => setAnimationStatus(v => !v)}>Cancel</Button>
                  </CardFooter>
                </Card>
              </animated.div>
            </GridItem> : null}
        </Grid>
      </Dialog>
    </div>
  );
};

export default NewTransaction;