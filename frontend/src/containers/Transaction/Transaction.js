import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {makeStyles, MenuItem, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {transactionsFetchRequest} from "../../store/actions/transactionsActions";
import {fetchCategoriesRequest} from "../../store/actions/categoriesActions";
import Button from "../../template/CustomButtons/Button";

const useStyle = makeStyles({
    root: {

    }
});

const Transaction = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    // const transactions = useSelector(state => state.transactions.transactions);
    const categories = useSelector(state => state.categories.categories);
    const [category, setCategory] = useState();

    useEffect(() => {
        dispatch(transactionsFetchRequest());
        dispatch(fetchCategoriesRequest());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(transactionsFetchRequest({id: category}));
    }

    return (
        <Grid item container direction="column" className={classes.root}>
            <Grid item container direction='row' spacing={2}>
                <Grid item xs>
                    <TextField
                        required
                        label={category.category}
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
                </Grid>
                <Grid item xs>
                    <Button color='primary' onClick={handleSearch}>Search</Button>
                </Grid>
            </Grid>
            <Grid item xs>
                <Doughnut
                    type='doughnut'
                    data={{
                        labels: ['Red', 'Blue', 'Yellow'],
                        datasets: [{
                            label: 'My First Dataset',
                            data: [300, 50, 100],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }]
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Transaction;