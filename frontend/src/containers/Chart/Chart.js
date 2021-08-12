import React, {useEffect, useState} from 'react';
import {Doughnut} from "react-chartjs-2";
import {useDispatch, useSelector} from "react-redux";
import {transactionsTypeRequest} from "../../store/actions/transactionsActions";

import FormElement from "../../components/UI/Form/FormElement";
import {categoryTypes} from "../../utils";

import Grid from "@material-ui/core/Grid";
import Button from "../../components/UI/CustomButtons/Button";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {primaryColor} from "../../assets/jss/material-dashboard-react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/components/transactionsStyle";
import DateRangeDialog from "../../components/UI/DateRangeDialog/DateRangeDialog";

const useStyles = makeStyles(styles);

const Chart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const transactions = useSelector(state => state.transactions.transactions.rows);
  const [openDialog, setOpenDialog] = useState({date: false, categoryType: false});
  const [criteria, setCriteria] = useState({
    categoryType: "Expense",
    range: [{
      startDate: new Date(),
      endDate: null,
      key: 'selection',
      color: primaryColor[1]
    }],
  });

  const [clear, setClear] = useState(true);
  const [search, setSearch] = useState(true);

  useEffect(() => {
    dispatch(transactionsTypeRequest(criteria));
    setSearch(!search);
  }, [dispatch, criteria]);

  const holder = {};

  transactions.forEach(function (d) {
    if (holder.hasOwnProperty(d.type && d.category.name)) {
      if (d.type === 'Expense') {
        holder[d.category.name] = parseInt(holder[d.category.name]) + parseInt(d.sumOut);
      } else if (d.type === 'Income') {
        holder[d.category.name] = parseInt(holder[d.category.name]) + parseInt(d.sumIn);
      }
    } else {
      holder[d.category.name] = d.sumOut || d.sumIn;
    }
  });

  const obj2 = [];

  for (const prop in holder) {
    obj2.push({category: prop, sum: holder[prop]});
  }

  const handleDialogOpen = (type) => {
    setOpenDialog({...openDialog, [type]: !openDialog[type]})
  };

  const handleClose = (type) => {
    setOpenDialog({...openDialog, [type]: false});
    if (!clear) {
      setClear(!clear)
    }
  };

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
      }]
    })
    setSearch(!search);
    setClear(!clear);
  }

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    setCriteria(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Grid item container direction="column">
      <Grid item container direction='row' justify='center' alignItems='center' spacing={2}>
        <Grid item xs={5}>
          <FormElement
            size={'small'}
            required
            name="categoryType"
            value={criteria.categoryType}
            select
            options={categoryTypes}
            onChange={inputChangeHandler}
            onClick={() => handleDialogOpen('categoryType')}
          />
        </Grid>
        <Grid container item xs={4} alignItems="center">
          <Button block color={'grey'}
                  inputStyled
                  onClick={() => handleDialogOpen('date')}>
            {criteria.range[0].endDate ? ('0' + criteria.range[0].startDate?.getDate()).slice(-2) + '.' + ('0' + (criteria.range[0].startDate?.getMonth() + 1)).slice(-2) + '.' + criteria.range[0].startDate?.getFullYear() : 'Start date'}
            {'  -  '}
            {criteria.range[0].endDate ? ('0' + criteria.range[0].endDate?.getDate()).slice(-2) + '.' + ('0' + (criteria.range[0].endDate?.getMonth() + 1)).slice(-2) + '.' + criteria.range[0].endDate?.getFullYear() : 'End date'}

            {<DateRangeIcon/>}
          </Button>
        </Grid>
        <Grid container item xs={3} className={classes.criteriaContainer} alignItems="center">
          {clear ? <Button block color='success'
                           disabled={!criteria.range[0].endDate && !criteria.type}
                           onClick={handleSearch}>Search</Button> :
            <Button block color='rose' onClick={handleClearSearch}>Clear all</Button>}
        </Grid>
      </Grid>
      <Grid item xs>
        <Doughnut
          style={{width: 550, height: 550, padding: 20}}
          type='doughnut'
          data={{
            labels: obj2.map(o => (o.category + ': ' + o.sum + ' ' + user.preferences)),
            datasets: [{
              label: 'My Chart',
              data: obj2.map(o => (o.sum)),
              backgroundColor: [
                '#4caf50',
                '#9c27b0',
                '#00acc1',
                '#f44336',
                '#4caf50',
                '#e91e63'
              ],
              hoverOffset: 4,
              borderWidth: 2
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '30%',
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  color: '#9c27b0',
                  font: {
                    size: 18
                  }
                }
              }
            }
          }}
        />
      </Grid>

      <DateRangeDialog open={openDialog.date} handleClose={() => handleClose('date')} ranges={criteria.range}
                       setCriteria={(prop) => setCriteria({...criteria, range: [prop]})}/>
    </Grid>
  );
};

export default Chart;