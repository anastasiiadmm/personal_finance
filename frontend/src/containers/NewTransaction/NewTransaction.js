import React, {useEffect, useRef, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CircularProgress, Dialog} from "@material-ui/core";
import Card from "../../components/UI/Card/Card";
import CardHeader from "../../components/UI/Card/CardHeader";
import CardFooter from "../../components/UI/Card/CardFooter";
import styles from "../../assets/jss/material-dashboard-react/components/newTransactionStyle";
import GridItem from "../../components/UI/Grid/GridItem";
import GridContainer from "../../components/UI/Grid/GridContainer";
import {animated, useSpring} from "react-spring";
import Button from "../../components/UI/CustomButtons/Button";
import {useDispatch, useSelector} from "react-redux";
import CardBody from "../../components/UI/Card/CardBody";
import FileInput from "../../components/UI/Form/FileInput";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {transactionPost} from "../../store/actions/transactionsActions";
import {fetchCategoriesRequest} from "../../store/actions/categoriesActions";
import ComponentTree from "../../components/UI/ComponentTree/ComponentTree";
import {groupsRequest} from "../../store/actions/groupsActions";

const useStyles = makeStyles(styles);


const NewTransaction = ({handleClose, open, type}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.transactions.transactionPostError);
  const loading = useSelector(state => state.transactions.transactionPostLoading);
  const fetchLoading = useSelector(state => state.groups.groupsLoading);
  const groups = useSelector(state => state.groups.groups);
  const categories = useSelector(state => state.categories.categories);

  const categoryByType = categories.filter(obj => {
    return obj.categoryType === type
  });

  useEffect(() => {
    dispatch(groupsRequest());
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);


  const [animationStatus, setAnimationStatus] = useState(false);
  const [animationCategory, setAnimationCategory] = useState(false);
  const [animationAccount, setAnimationAccount] = useState(false);

  const tempDate = new Date();
  const accountFromId = useRef('')
  const accountToId = useRef('');
  const sum = useRef('');
  const categoryId = useRef('');
  const groupId = useRef('');
  const transactionDate = useRef(tempDate.getFullYear() + '-' + ('0' + (tempDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tempDate.getDate()).slice(-2) + 'T' + ('0' + tempDate.getHours()).slice(-2) + ':' + ('0' + tempDate.getMinutes()).slice(-2));
  const description = useRef('');
  const [group, setGroup] = useState('');
  const [accounts, setAccounts] = useState([]);


  let cashierCheck = '';


  const primaryProps = useSpring({
    opacity: 1,
    reset: animationStatus || animationCategory || animationAccount,
    from: {
      transform: 'translateX(150px)'
    },
    to: {
      transform: 'translateX(0)'
    },
  });


  const descriptionProps = useSpring({
    opacity: 1,
    reset: animationStatus,
    transform: 'translateX(-15px)',
    from: {
      opacity: 0,
      transform: 'translateX(-50px)'
    }
  });

  const categoryProps = useSpring({
    opacity: 1,
    reset: animationCategory,
    transform: 'translateX(-15px)',
    from: {
      opacity: 0,
      transform: 'translateX(-50px)'
    }
  });

  const accountProps = useSpring({
    opacity: 1,
    reset: animationAccount,
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
    if (description.current !== '' && description.current != null) {
      transaction.description = description.current.value;
    }
    transaction.categoryId = categoryId.current.id;
    transaction.accountToId = type === 'transfer' ? accountToId.current.value : accountToId.current.id;
    transaction.sumIn = sum.current.value;
    transaction.groupId = type === 'transfer' ? group : groupId.current.groupId;
    transaction.accountFromId = type === 'transfer' ? accountFromId.current.value : accountFromId.current.id;
    transaction.sumOut = sum.current.value;
    transaction.type = type;
    transaction.date = new Date(transactionDate.current.value);
    await dispatch(transactionPost(transaction))
    handleClose()
  };

  const getFieldError = fieldName => {
    let errors = undefined;
    if (error && error.errors) {
      error.errors.map(prop => {
        if (prop.path === fieldName) {
          errors = prop.message
        }
        return null;
      })
    }
    return errors;
  }

  const chooseCategory = (prop) => {
    categoryId.current = prop;
  }
  const chooseAccount = (prop) => {
    if (type === 'expenditure') {
      accountFromId.current = prop;
    } else {
      accountToId.current = prop;
    }
    groupId.current = prop;
  }
  console.log(accounts)

  return (
    <div>
      <Dialog
        maxWidth={'lg'}
        disableScrollLock
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '100%'
          },
        }} open={open} onClose={handleClose}>
        {fetchLoading ? <Grid container justify="center" alignItems="stretch">
            <GridItem xs={1}><CircularProgress/></GridItem>
          </Grid> :
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
                        size={'small'}
                        required
                        disabled={animationAccount}
                        value={accountFromId.current ? accountFromId.current.name : ''}
                        onClick={() => {
                          setAnimationAccount(v => !v)
                          setAnimationStatus(v => v ? !v : v)
                          setAnimationCategory(v => v ? !v : v)
                        }}
                      /> : null}
                      {type === 'income' ? <FormElement
                        size={'small'}
                        label="To account"
                        required
                        disabled={animationAccount}
                        value={accountToId.current ? accountToId.current.name : ''}
                        onClick={() => {
                          setAnimationAccount(v => !v)
                          setAnimationStatus(v => v ? !v : v)
                          setAnimationCategory(v => v ? !v : v)
                        }}
                      /> : null}
                      {type === 'transfer' ? <GridContainer spacing={1}>
                        <Grid item xs={12}>
                          <FormElement
                            size={'small'}
                            label="Group"
                            select
                            value={group}
                            onClick={() => {
                              setAnimationAccount(v => v ? !v : v)
                              setAnimationStatus(v => v ? !v : v)
                              setAnimationCategory(v => v ? !v : v)
                            }}
                            required
                            onChange={(e) => {
                              setGroup(e.target.value)
                              setAccounts(groups.find((group) => group.id === e.target.value).accounts)
                            }}
                            options={groups}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormElement
                            label="From account"
                            size={'small'}
                            select
                            inputRef={accountFromId}
                            defaultValue=''
                            required
                            disabled={group === ''}
                            options={accounts}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormElement
                            label="To account"
                            size={'small'}
                            select
                            inputRef={accountToId}
                            defaultValue=''
                            required
                            disabled={group === ''}
                            options={accounts}
                          />
                        </Grid>
                      </GridContainer> : null}
                      <FormElement
                        label="Category"
                        required
                        size={'small'}
                        disabled={animationCategory}
                        value={categoryId.current ? categoryId.current.name : ''}
                        onClick={() => {
                          setAnimationCategory(v => !v)
                          setAnimationStatus(v => v ? !v : v)
                          setAnimationAccount(v => v ? !v : v)
                        }}
                      />
                      <FormElement
                        label="Date"
                        required
                        size={'small'}
                        type="datetime-local"
                        defaultValue={transactionDate.current}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputRef={transactionDate}
                      />
                      <FormElement
                        label="Amount"
                        type="number"
                        required
                        size={'small'}
                        InputProps={{
                          step: 1.00,
                        }}
                        inputRef={sum}
                        defaultValue=''
                      />
                      <Grid item xs>
                        <Button disabled={animationStatus} block size={'sm'} color={'info'}
                                onClick={() => {
                                  setAnimationStatus(v => !v)
                                  setAnimationCategory(v => v ? !v : v)
                                  setAnimationAccount(v => v ? !v : v)
                                }}>Add
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
                <animated.div style={descriptionProps} className={classes.animation}>
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
            {animationCategory ?
              <GridItem xs={6}>
                <animated.div style={categoryProps} className={classes.animation}>
                  <Card>
                    <CardHeader>
                      <h3 className={classes.cardTitle}>
                        Choose category
                      </h3>
                    </CardHeader>
                    <CardBody plain>
                      <GridContainer spacing={1} direction="column">
                        <Grid item xs>
                          <ComponentTree items={categoryByType} recursive={true} chooseItem={chooseCategory}/>
                        </Grid>
                      </GridContainer>
                    </CardBody>
                    <CardFooter plain>
                      <Button color={'success'} size={'sm'} block
                              onClick={() => setAnimationCategory(v => !v)}>Choose</Button>
                    </CardFooter>
                  </Card>
                </animated.div>
              </GridItem> : null}
            {animationAccount ?
              <GridItem xs={6}>
                <animated.div style={accountProps} className={classes.animation}>
                  <Card>
                    <CardHeader>
                      <h3 className={classes.cardTitle}>
                        Choose Account
                      </h3>
                    </CardHeader>
                    <CardBody plain>
                      <GridContainer spacing={1} direction="column">
                        <Grid item xs>
                          <ComponentTree items={groups} chooseItem={chooseAccount} recursive={false}
                                         subName={'accounts'}/>
                        </Grid>
                      </GridContainer>
                    </CardBody>
                    <CardFooter plain>
                      <Button color={'success'} size={'sm'} block
                              onClick={() => setAnimationAccount(v => !v)}>Choose</Button>
                    </CardFooter>
                  </Card>
                </animated.div>
              </GridItem> : null}
          </Grid>}
      </Dialog>
    </div>
  );
};

export default NewTransaction;