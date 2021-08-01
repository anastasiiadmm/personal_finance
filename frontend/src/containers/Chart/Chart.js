import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {transactionsTypeRequest} from "../../store/actions/transactionsActions";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import {categoryTypes} from "../../utils";
import Button from "../../template/CustomButtons/Button";
import {Doughnut} from "react-chartjs-2";

const Chart = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.transactions);
    console.log(transactions)
    const [state, setState] = useState("Expense");

    // useEffect(() => {
    //     dispatch(transactionsTypeRequest());
    // }, [dispatch]);

    const handleSearch = () => {
        dispatch(transactionsTypeRequest({categoryType: state}));
    }

    return (
        <Grid item container direction="column">
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
                            label: 'My Chart',
                            data: transactions.map(tr => (+tr.sumIn || -tr.sumOut)),
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