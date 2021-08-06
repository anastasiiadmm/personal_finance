import React, {useEffect, useState} from 'react';
import Card from "../../../components/UI/Card/Card";
import CardHeader from "../../../components/UI/Card/CardHeader";
import CardBody from "../../../components/UI/Card/CardBody";
import GridContainer from "../../../components/UI/Grid/GridContainer";
import FileInput from "../../../components/UI/Form/FileInput";
import CardAvatar from "../../../components/UI/Card/CardAvatar";
import FormElement from "../../../components/UI/Form/FormElement";
import ReceiptIcon from '@material-ui/icons/Receipt';
import CardFooter from "../../../components/UI/Card/CardFooter";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-dashboard-react/components/transactionsStyle";
import {useDispatch, useSelector} from "react-redux";
import {apiURL} from "../../../config";
import DialogContainer from "../../../components/UI/DialogContainer/DialogContainer";
import {whiteColor} from "../../../assets/jss/material-dashboard-react";
import Success from "../../../components/UI/Typography/Success";
import Grid from "@material-ui/core/Grid";
import Button from "../../../components/UI/CustomButtons/Button";
import StyleIcon from '@material-ui/icons/Style';
import {fetchCategoriesRequest} from "../../../store/actions/categoriesActions";
import ComponentTree from "../../../components/UI/ComponentTree/ComponentTree";
import CategoryIcon from "@material-ui/icons/Category";
import {deleteTransactionRequest} from "../../../store/actions/transactionsActions";


const useStyles = makeStyles(styles);

const EditTransaction = ({transaction, closeDialog, userId, groups}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const date = new Date(transaction.date);

  const categories = useSelector(state => state.categories.categories);
  const [dialog, setDialog] = React.useState({image: false, category: false});
  const transactionCreator = transaction.userId === userId;

  const [state, setState] = useState({
    categoryName: transaction.category.name,
    cashierCheck: transaction?.cashierCheck,
    description: transaction.description ? transaction.description : '',
    date: date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2),
    groupId: transaction.groupId,
    categoryId: transaction.categoryId,
    sum: transaction.sumIn ? transaction.sumIn : transaction.sumOut,
    accountFromId: transaction?.accountFromId,
    accountToId: transaction?.accountToId,
  });


  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);


  const onDeleteTransactHandler = id => {
    dispatch(deleteTransactionRequest(id));
  }

  const handleChange = (type) => {
    setDialog({...dialog, [type]: !dialog[type]});
  };


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


  return (
    <GridContainer item component="form" noValidate>
      <Card plain>
        <CardHeader stats color="primary">
          <h4 className={classes.cardTitleWhite}>{transactionCreator ? 'Edit Transaction' : 'Transaction details'}</h4>
        </CardHeader>
        <CardBody plain>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button block color={'grey'}
                      inputStyled
                      disabled={true}>Type: {transaction.type} {<StyleIcon/>}</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button block color={'grey'}
                      inputStyled
                      disabled={!transactionCreator}
                      onClick={() => handleChange('category')}>
                {state.categoryName}
                {<CategoryIcon/>}
              </Button>
              <DialogContainer style={{
                maxWidth: '400px', backgroundColor: whiteColor,
                boxShadow: 'none',
              }} open={dialog.category} handleClose={() => handleChange('category')}>
                <Card plain>
                  <CardHeader plain color={'info'}>
                    <h5 className={classes.cardTitleWhite}>Choose category</h5>
                  </CardHeader>
                  <CardBody plain>
                    <ComponentTree items={categories} recursive={true}
                                   chooseItem={prop => setState({
                                     ...state,
                                     categoryId: prop.id,
                                     categoryName: prop.name
                                   })}/>
                  </CardBody>
                  <CardFooter plain>
                    <Button color={'success'} size={'sm'} block
                            onClick={() => handleChange('category')}>Choose</Button>
                  </CardFooter>

                </Card>
              </DialogContainer>
            </Grid>
            <Grid item xs={12} sm={transaction.type === 'Transfer' ? 12 : 6}>
              <FormElement
                disabled={!transactionCreator}
                size={'small'}
                label="Group"
                select
                name={'groupId'}
                value={state.groupId}
                onChange={inputChangeHandler}
                required
                options={groups}
              />
            </Grid>
            <Grid item xs={12} sm={transaction.type === 'Transfer' ? 12 : 6}>
              {transaction.type === 'Income' ?
                <FormElement
                  size="small"
                  label="Account to"
                  select
                  disabled={!transactionCreator}
                  onChange={inputChangeHandler}
                  name="accountToId"
                  value={state.accountToId}
                  options={groups.length > 0 ? groups.find((group) => group.id === state.groupId
                  ).accounts : []}
                /> : <>{transaction.type === 'Expense' ?
                  <FormElement
                    size="small"
                    label="Account from"
                    select
                    disabled={!transactionCreator}

                    onChange={inputChangeHandler}
                    name="accountFromId"
                    value={state.accountFromId}
                    options={groups.length > 0 ? groups.find((group) => group.id === state.groupId
                    ).accounts : []}
                  /> :
                  <Grid item container spacing={1}>
                    <Grid item xs={6}>
                      <FormElement
                        size="small"
                        label="Account to"
                        select
                        disabled={!transactionCreator}
                        onChange={inputChangeHandler}
                        name="accountToId"
                        value={state.accountToId}
                        options={groups.length > 0 ? groups.find((group) => group.id === state.groupId
                        ).accounts : []}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormElement
                        size="small"
                        label="Account from"
                        select
                        disabled={!transactionCreator}
                        onChange={inputChangeHandler}
                        name="accountFromId"
                        value={state.accountFromId}
                        options={groups.length > 0 ? groups.find((group) => group.id === state.groupId
                        ).accounts : []}
                      />
                    </Grid>
                  </Grid>}
                </>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormElement
                label="Date"
                required
                disabled={!transactionCreator}
                size={'small'}
                type="datetime-local"
                name={'date'}
                value={state.date}
                onChange={inputChangeHandler}
              />
            </Grid>
            <FormElement
              size="small"
              label="Amount"
              type="number"
              required
              disabled={!transactionCreator}
              onChange={inputChangeHandler}
              name="sum"
              value={state.sum}
            />
            <Grid item container xs={12} sm={6}>
              <Grid item container xs={12} alignItems={'center'} spacing={1}>
                {transaction.cashierCheck ?
                  <>
                    <Grid item xs={transactionCreator ? 5 : 12}>
                      <CardAvatar check onClick={() => handleChange('image')}>
                        <img src={apiURL + "/" + transaction.cashierCheck} alt="Cashier Check"/>
                      </CardAvatar>
                    </Grid>
                    {transactionCreator ? <Grid item xs={7}>
                      <FileInput
                        name="cashierCheck"
                        buttonName={'Edit image'}
                        xs={12}
                        sm={12}
                        md={12}
                        hideInput
                        buttonInput
                        onChange={fileChangeHandler}
                      />
                    </Grid> : null}
                    <DialogContainer style={{
                      maxWidth: '500px', backgroundColor: whiteColor,
                      boxShadow: 'none',
                    }} open={dialog.image} handleClose={() => handleChange('image')}>
                      <img src={apiURL + "/" + transaction.cashierCheck} className={classes.checkImage}
                           alt="Cashier Check"/>
                    </DialogContainer>
                  </> : <>
                    {transactionCreator ? <FileInput
                        name="cashierCheck"
                        buttonName={'Upload'}
                        buttonInput
                        xs={6}
                        sm={6}
                        disabled={!transactionCreator}
                        md={6}
                        hideInput
                        onChange={fileChangeHandler}
                      > <CardAvatar check>  {state.cashierCheck ?
                        <Success><ReceiptIcon/></Success> :
                        <ReceiptIcon/>} </CardAvatar> </FileInput> :
                      <Grid item xs={transactionCreator ? 5 : 12}>
                        <CardAvatar icon onClick={() => handleChange('image')}>
                          <ReceiptIcon/>
                        </CardAvatar>
                      </Grid>}
                  </>

                }
              </Grid>
            </Grid>
            <FormElement
              label="Description"
              type="text"
              name={'description'}
              value={state.description}
              multiline
              disabled={!transactionCreator}
              onChange={inputChangeHandler}
              rows={2}
            />
          </Grid>
        </CardBody>
        <CardFooter plain>
          {transactionCreator ?
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={10}>
                <Button
                  block
                  color={'success'}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  block
                  onClick={() => {
                    onDeleteTransactHandler(transaction.id);
                    closeDialog()
                  }}
                  color={'danger'}
                >
                  Delete
                </Button>
              </Grid>
            </Grid> : null}
        </CardFooter>
      </Card>
    </GridContainer>
  )
    ;
};

export default EditTransaction;