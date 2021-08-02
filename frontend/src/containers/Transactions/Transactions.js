import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { transactionsFetchRequest} from "../../store/actions/transactionsActions";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../template/CustomButtons/Button";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {CircularProgress, Dialog, InputBase, MenuItem, Select, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import {Link} from "react-router-dom";
import OneTransaction from "../OneTransaction/OneTransaction";
import styles from "../../assets/jss/material-dashboard-react/components/transactionsStyle";
import {primaryColor} from "../../assets/jss/material-dashboard-react";
import DateRangeDialog from "../../components/UI/DateRangeDialog/DateRangeDialog";
import {fetchCategoriesRequest} from "../../store/actions/categoriesActions";
import DateRangeIcon from '@material-ui/icons/DateRange';
import CategoryIcon from '@material-ui/icons/Category';
import CategoryTree from "../../components/UI/CategoryTree/CategoryTree";


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase);

const useStyles = makeStyles(styles);

const Transactions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.transactions);
  const categories = useSelector(state => state.categories.categories);
  const loading = useSelector(state => state.transactions.transactionsLoading);
  const user = useSelector(state => state.users.user);

  const [criteria, setCriteria] = useState({
    limit: 5,
    offset: 0,
    range: [{
      startDate: null,
      endDate: null,
      key: 'selection',
      color: primaryColor[1]
    }],
    category: {
      id: null, name: null
    }
  });
  const [openDialog, setOpenDialog] = useState({date: false, category: false, details: true});
  const [search, setSearch] = useState(true);


  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch])


  useEffect(() => {
    if (search) {
      dispatch(transactionsFetchRequest(criteria));
      setSearch(!search);
    }
  }, [dispatch, criteria, search]);

  const handleSearch = () => {
    setSearch(!search)
    console.log(criteria)
  }
  //
  // const onDeleteTransactHandler = id => {
  //   dispatch(deleteTransactionRequest(id));
  // }

  const setTransactionPerPage = (event) => {
    setCriteria({...criteria, limit: event.target.value});
  };
  const setNext = (next) => {
    if (next && criteria.offset + criteria.limit < transactions.count) {
      setCriteria({...criteria, offset: criteria.offset + criteria.limit});
    } else if (transactions.count - criteria.offset >= 0) {
      setCriteria({...criteria, offset: criteria.offset - criteria.limit > 0 ? criteria.offset - criteria.limit : 0});
    }
    setSearch(!search);
  };

  const handleClose = (type) => {
    setOpenDialog({...openDialog, [type]: false});
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs>
        <Button component={Link} to='/chart-transaction' color="primary" startIcon={<DonutSmallIcon/>}>
          Show chart
        </Button>
      </Grid>
      <Grid container direction='row'>
        <Grid container item xs={3} className={classes.criteriaContainer} alignItems="center">
          <Button block color={'grey'}
                  inputStyled
                  onClick={() => setOpenDialog({...openDialog, category: true})}>
            {criteria.category.name ? criteria.category.name : 'Category'}
            {<CategoryIcon/>}
          </Button>
        </Grid>
        <Grid container item xs={3} className={classes.criteriaContainer} alignItems="center">
          <Button block color={'grey'}
                  inputStyled
                  onClick={() => setOpenDialog({...openDialog, date: true})}>
            {criteria.range[0].endDate ? ('0' + criteria.range[0].startDate?.getDate()).slice(-2) + '.' + ('0' + (criteria.range[0].startDate?.getMonth() + 1)).slice(-2) + '.' + criteria.range[0].startDate?.getFullYear() : 'Start date'}
            {<DateRangeIcon/>}
          </Button>
        </Grid>
        <Grid container item xs={3} className={classes.criteriaContainer} alignItems="center">
          <Button block color={'grey'}
                  inputStyled
                  onClick={() => setOpenDialog({...openDialog, date: true})}>
            {criteria.range[0].endDate ? ('0' + criteria.range[0].endDate?.getDate()).slice(-2) + '.' + ('0' + (criteria.range[0].endDate?.getMonth() + 1)).slice(-2) + '.' + criteria.range[0].endDate?.getFullYear() : 'End date'}
            {<DateRangeIcon/>}
          </Button>
        </Grid>
        <Grid container item xs={3} className={classes.criteriaContainer} alignItems="center">
          <Button block color='primary' onClick={handleSearch}>Search</Button>
        </Grid>
      </Grid>
      <Grid container item xs={12}>

        <Grid container direction='column' className={classes.transactionsContainer}>
          {!loading ?
            transactions?.rows && transactions.rows.map(transaction => (
              <OneTransaction key={transaction.id} currency={user.preferences}
                              openDetails={() => setOpenDialog({...openDialog, details: transaction.id})}
                              transaction={transaction}/>
            )) : <CircularProgress size={40} className={classes.progressCircle} color="inherit"/>}
        </Grid>
      </Grid>
      <Grid container item direction="row"
            alignItems="center"
            className={classes.navigationContainer}
            spacing={2}>
        <Grid item>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={criteria.limit}
            onChange={setTransactionPerPage}
            input={<BootstrapInput/>}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button disabled={criteria.offset === 0} justIcon color={"primary"}
                  onClick={() => setNext(false)}><ArrowLeftIcon/></Button>
          <Button disabled={criteria.offset + criteria.limit >= transactions.count} justIcon color={"primary"}
                  onClick={() => setNext(true)}><ArrowRightIcon/></Button>
        </Grid>
      </Grid>
      <Dialog
        disableScrollLock
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            minWidth: '335px',
            backgroundColor: 'white',
            boxShadow: 'none',
            maxWidth: '335px',
            padding: "20px 20px"
          },
        }} open={openDialog.category} onClose={() => handleClose('category')}>
        <CategoryTree categories={categories} chooseCategory={(prop) => setCriteria({...criteria, category: prop})}/>
      </Dialog>
      <DateRangeDialog open={openDialog.date} handleClose={() => handleClose('date')} ranges={criteria.range}
                       setCriteria={(prop) => setCriteria({...criteria, range: [prop]})}/>
    </Grid>
  );
};

export default Transactions;