import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {transactionsFetchRequest} from "../../store/actions/transactionsActions";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../template/CustomButtons/Button";
import theme from "../../theme";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {fetchCategoriesRequest, fetchCategoryRequest} from "../../store/actions/categoriesActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});


const Transactions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.transactions);
  const categories = useSelector(state => state.categories.categories);

  const [category, setCategory] = useState('');


  useEffect(() => {
    dispatch(transactionsFetchRequest());
    dispatch(fetchCategoriesRequest());
  }, []);


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
  return (
      <>
        <Grid>
          <TextField
              required
              label="Filter by category"
              name="category"
              value={category.category}
              onChange={(e) => setCategory(e.target.value)}
              select={true}>
            {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleSearch}>Search</Button>
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">userId</TableCell>
                <TableCell align="right">accountFromId</TableCell>
                <TableCell align="right">accountToId</TableCell>
                <TableCell align="right">sumOut</TableCell>
                <TableCell align="right">sumIn</TableCell>
                <TableCell align="right">category</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">cashierCheck</TableCell>
                <TableCell align="right">createdAt</TableCell>
                <TableCell align="right">updatedAt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions && transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell component="th" scope="row">{transaction.id}</TableCell>
                    <TableCell align="right">{transaction.userId}</TableCell>
                    <TableCell align="right">{transaction.accountFromId}</TableCell>
                    <TableCell align="right">{transaction.accountToId}</TableCell>
                    <TableCell align="right">{transaction.sumOut}</TableCell>
                    <TableCell align="right">{transaction.sumIn}</TableCell>
                    <TableCell align="right">{transaction.category.name}</TableCell>
                    <TableCell align="right">{transaction.description}</TableCell>
                    <TableCell align="right">{transaction.cashierCheck}</TableCell>
                    <TableCell align="right">{transaction.createdAt}</TableCell>
                    <TableCell align="right">{transaction.updatedAt}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  );
};

export default Transactions;