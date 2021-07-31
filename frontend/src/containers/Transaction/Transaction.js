import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {transactionsTypeRequest} from "../../store/actions/transactionsActions";
import Button from "../../template/CustomButtons/Button";
import FormElement from "../../components/UI/Form/FormElement";
import {categoryTypes} from "../../utils";

const useStyle = makeStyles({
    root: {},
    chart: {
        width: 750,
        height: 750
    }
});

const Transaction = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.transactions);
    console.log(transactions)

    const [state, setState] = useState('');

    useEffect(() => {
        dispatch(transactionsTypeRequest());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(transactionsTypeRequest({categoryType: state}));
    }

    // const inputChangeHandler = (e) => {
    //     const {name, value} = e.target;
    //     setState(prev => ({...prev, [name]: value}));
    // };

    return (
        <Grid item container direction="column" className={classes.root}>
            <Grid item container direction='row' spacing={2}>
                <FormElement
                    required
                    label="Filter by category type"
                    name="categoryType"
                    value={state}
                    select
                    options={categoryTypes}
                    onChange={e => setState(e.target.value)}
                />
                <Grid item xs>
                    <Button color='primary' onClick={handleSearch}>Search</Button>
                </Grid>
            </Grid>
            <Grid item xs>
                    <Doughnut
                        style={{width: 600, height: 600, padding: 20}}
                        type='doughnut'
                        data={{
                            labels: transactions.map(tr => (tr.category.name)),
                            datasets: [{
                                label: 'My First Dataset',
                                data: transactions.map(tr => (tr.sumIn || tr.sumOut)),
                                backgroundColor: [
                                    '#9c27b0',
                                    '#4caf50',
                                    '#00acc1'
                                ],
                                hoverOffset: 4,
                                borderWidth: 2
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
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

export default Transaction;