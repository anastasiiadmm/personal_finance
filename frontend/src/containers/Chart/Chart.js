import React, {useEffect, useState} from 'react';
import {Doughnut} from "react-chartjs-2";
import {useDispatch, useSelector} from "react-redux";
import {transactionsTypeRequest} from "../../store/actions/transactionsActions";

import FormElement from "../../components/UI/Form/FormElement";
import {categoryTypes} from "../../utils";

import Grid from "@material-ui/core/Grid";
// import Button from "../../template/CustomButtons/Button";

const Chart = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.transactions.rows);
  console.log(transactions)
  const [state, setState] = useState('Expense');

  useEffect(() => {
    dispatch(transactionsTypeRequest({categoryType: state}));
  }, [dispatch, state]);

  // const handleSearch = () => {
  //     dispatch(transactionsTypeRequest({categoryType: state}));
  // }

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

  return (
    <Grid item container direction="column">
      <Grid item container direction='row' spacing={2} style={{width: '40%'}}>
        <FormElement
          required
          label="Filter by category type"
          name="categoryType"
          value={state}
          select
          options={categoryTypes}
          onChange={e => setState(e.target.value)}
        />
        {/*<Grid item xs>*/}
        {/*    <Button color='primary' onClick={handleSearch}>Search</Button>*/}
        {/*</Grid>*/}
      </Grid>
      <Grid item xs>
        <Doughnut
          style={{width: 600, height: 600, padding: 20}}
          type='doughnut'
          data={{
            labels: obj2.map(o => (o.category)),
            datasets: [{
              label: 'My Chart',
              data: obj2.map(o => (o.sum)),
              backgroundColor: [
                '#9c27b0',
                '#4caf50',
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
    </Grid>
  );
};

export default Chart;