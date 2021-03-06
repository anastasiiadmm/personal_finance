import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {transactionsFetchRequest} from "../../store/actions/transactionsActions";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../components/UI/CustomButtons/Button";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {CircularProgress, InputBase, MenuItem, Select, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import styles from "../../assets/jss/material-dashboard-react/components/transactionsStyle";
import {primaryColor, whiteColor} from "../../assets/jss/material-dashboard-react";
import DateRangeDialog from "../../components/UI/DateRangeDialog/DateRangeDialog";
import {fetchCategoriesRequest} from "../../store/actions/categoriesActions";
import DateRangeIcon from '@material-ui/icons/DateRange';
import CategoryIcon from '@material-ui/icons/Category';
import ComponentTree from "../../components/UI/ComponentTree/ComponentTree";
import EditTransaction from "./EditTransaction/EditTransaction";
import DialogContainer from "../../components/UI/DialogContainer/DialogContainer";
import OneTransaction from "./OneTransaction/OneTransaction";
import {groupsRequest} from "../../store/actions/groupsActions";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import NewTransaction from "../NewTransaction/NewTransaction";

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
  const groups = useSelector(state => state.groups.groups);
  const loading = useSelector(state => state.transactions.transactionsLoading);
  const user = useSelector(state => state.users.user);

  const [criteria, setCriteria] = useState({
    limit: 5,
    offset: 0,
    range: [{
      startDate: new Date(),
      endDate: null,
      key: 'selection',
      color: primaryColor[1]
    }],
    category: {
      id: null, name: null
    }
  });
  const [openDialog, setOpenDialog] = useState({date: false, category: false, editTransaction: null});
  const [search, setSearch] = useState(true);
  const [clear, setClear] = useState(true);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
    dispatch(groupsRequest());
  }, [dispatch])


  useEffect(() => {
    if (search) {
      dispatch(transactionsFetchRequest(criteria));
      setSearch(!search);
    }
  }, [dispatch, criteria, search]);

  const handleSearch = () => {
    setSearch(!search);
    setClear(!clear);
  }

  const handleClearSearch = () => {
    setCriteria({
      ...criteria, range: [{
        startDate: new Date(),
        endDate: null,
        key: 'selection',
        color: primaryColor[1]
      }],
      category: {
        id: null, name: null
      }
    })
    setSearch(!search);
    setClear(!clear);
  }

  const setTransactionPerPage = (event) => {
    setCriteria({...criteria, limit: event.target.value});
    setSearch(!search);
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
    if (type === 'editTransaction') {
      setOpenDialog({...openDialog, editTransaction: null});
    } else {
      setOpenDialog({...openDialog, [type]: false});
    }
    if (!clear) {
      setClear(!clear)
    }
  };

  const handleDialogOpen = (type) => {
    setOpenDialog({...openDialog, [type]: !openDialog[type]})
  }

  const handleCloseDialog = () => {
    setOpenDialog({...openDialog, open: false});
  };
  const handleOpenDialog = (dialog) => {
    setOpenDialog({...openDialog, open: true, type: dialog});
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Button justIcon onClick={() => handleOpenDialog('income')}
                size={"sm"} color={"success"}><ArrowDownwardIcon className={classes.icons}/></Button>
        <Button justIcon size={"sm"} onClick={() => handleOpenDialog('transfer')}
                color={"info"}><SyncAltIcon className={classes.icons}/></Button>
        <Button justIcon onClick={() => handleOpenDialog('expenditure')}
                size={"sm"} color={"danger"}><ArrowUpwardIcon className={classes.icons}/></Button>
      </Grid>
      <Grid container item direction='row' spacing={1}>
        <Grid container item xs={4} sm={3} className={classes.criteriaContainer} alignItems="center">
          <Button block color={'grey'}
                  inputStyled
                  onClick={() => handleDialogOpen('category')}>
            {criteria.category.name ? criteria.category.name : 'Category'}
            {<CategoryIcon/>}
          </Button>
        </Grid>
        <Grid container item xs={8} sm={6} className={classes.criteriaContainer} alignItems="center">
          <Button block color={'grey'}
                  inputStyled
                  onClick={() => handleDialogOpen('date')}>
            {criteria.range[0].endDate ? ('0' + criteria.range[0].startDate?.getDate()).slice(-2) + '.' + ('0' + (criteria.range[0].startDate?.getMonth() + 1)).slice(-2) + '.' + criteria.range[0].startDate?.getFullYear() : 'Start date'}
            {'  -  '}
            {criteria.range[0].endDate ? ('0' + criteria.range[0].endDate?.getDate()).slice(-2) + '.' + ('0' + (criteria.range[0].endDate?.getMonth() + 1)).slice(-2) + '.' + criteria.range[0].endDate?.getFullYear() : 'End date'}

            {<DateRangeIcon/>}
          </Button>
        </Grid>
        <Grid container item xs={12} sm={3} className={classes.criteriaContainer} alignItems="center">
          {clear ? <Button block color='success'
                           disabled={!criteria.range[0].endDate && !criteria.category.id}
                           onClick={handleSearch}>Search</Button> :
            <Button block color='rose' onClick={handleClearSearch}>Clear all</Button>}
        </Grid>
      </Grid>
      <Grid container item xs={12}>

        <Grid container direction='column' className={classes.transactionsContainer}>
          {!loading ?
            transactions?.rows && transactions.rows.map(transaction => (
              <OneTransaction key={transaction.id} currency={user.preferences}
                              openDetails={() => setOpenDialog({...openDialog, editTransaction: transaction.id})}
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
      <DialogContainer style={{
        minWidth: '335px', maxWidth: '335px', backgroundColor: whiteColor,
        boxShadow: 'none',
      }} open={openDialog.category} handleClose={() => handleClose('category')}>
        <ComponentTree items={categories} chooseItem={(prop) => setCriteria({...criteria, category: prop})}
                       recursive={true}/>
      </DialogContainer>
      {
        !!openDialog?.editTransaction && <DialogContainer open={!!openDialog.editTransaction} style={{
          maxWidth: '80%', backgroundColor: whiteColor,
          boxShadow: 'none',
        }} handleClose={() => handleClose('editTransaction')}>
          <EditTransaction
            closeDialog={() => handleClose('editTransaction')}
            transaction={transactions.rows.find(transaction => {
              return transaction.id === openDialog.editTransaction
            })}
            userId={user.id}
            groups={groups}
          />
        </DialogContainer>
      }
      <DateRangeDialog open={openDialog.date} handleClose={() => handleClose('date')} ranges={criteria.range}
                       setCriteria={(prop) => setCriteria({...criteria, range: [prop]})}/>
      {openDialog.open ?
        <NewTransaction open={openDialog.open} type={openDialog.type} handleClose={handleCloseDialog}/> : null
      }
    </Grid>
  );
};

export default Transactions;