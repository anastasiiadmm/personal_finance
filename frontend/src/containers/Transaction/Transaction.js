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
    root: {}
});

const Transaction = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.transactions);
    console.log(transactions)

    const [categoryType, setCategoryType] = useState('');

    useEffect(() => {
        dispatch(transactionsTypeRequest());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(transactionsTypeRequest({categoryType: categoryType}));
    }

    return (
        <Grid item container direction="column" className={classes.root}>
            <Grid item container direction='row' spacing={2}>
                <FormElement
                    required
                    label="Filter by category type"
                    name="categoryType"
                    value={categoryType}
                    select
                    options={categoryTypes}
                    onChange={(e) => setCategoryType(e.target.value)}
                />
                <Grid item xs>
                    <Button color='primary' onClick={handleSearch}>Search</Button>
                </Grid>
            </Grid>
            <Grid item xs>
                <Doughnut
                    width={100}
                    height={100}
                    type='doughnut'
                    data={{
                        labels: transactions.map(tr => (tr.category.name)),
                        datasets: [{
                            label: 'My First Dataset',
                            data: transactions.map(tr => (tr.sumIn)),
                            backgroundColor: [
                                '#9c27b0',
                                '#4caf50',
                                '#00acc1'
                            ],
                            hoverOffset: 4
                        }]
                    }}
                    options={{

                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Transaction;