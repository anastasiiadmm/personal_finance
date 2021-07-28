import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {transactionsFetchRequest} from "../../store/actions/transactionsActions";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../template/CustomButtons/Button";
import {MenuItem, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {fetchCategoriesRequest} from "../../store/actions/categoriesActions";
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import {Link} from "react-router-dom";
import OneTransaction from "../OneTransaction/OneTransaction";
import {grayColor} from "../../assets/jss/material-dashboard-react";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  transactionsContainer: {
    "&:last-child": {
      borderBottom: '1px solid ' + grayColor[6],
    },
  }
});

const Transactions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.transactions);
  const categories = useSelector(state => state.categories.categories);
  const user = useSelector(state => state.users.user)

  const [category, setCategory] = useState('');


  useEffect(() => {
    dispatch(transactionsFetchRequest());
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);


  // useEffect(() => {
  //   if(transactions) {
  //     transactions.map(transaction => {
  //       return createData()
  //     });
  //   }
  // }, [transactions]);

  const handleSearch = () => {
    dispatch(transactionsFetchRequest({id: category}));
  }

  // const onDeleteTransactHandler = id => {
  //   dispatch(deleteTransactionRequest(id));
  // }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs>
        <Button component={Link} to='/chart-transaction' color="primary" startIcon={<DonutSmallIcon/>}>
          Show chart
        </Button>
      </Grid>
      <Grid container direction='row' spacing={2}>
        <Grid item xs>
          <TextField
            required
            label="Filter by category"
            name="category"
            value={category.category}
            onChange={(e) => setCategory(e.target.value)}
            select>
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <Button color='primary' onClick={handleSearch}>Search</Button>
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction='column' className={classes.transactionsContainer}>
          {
            transactions.map(transaction => (
              <OneTransaction key={transaction.id} currency={user.preferences} transaction={transaction}/>
            ))
          }
        </Grid>

      </Grid>
    </Grid>
  );
};

export default Transactions;