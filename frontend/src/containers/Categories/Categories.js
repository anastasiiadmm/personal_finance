import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCategoryRequest,
    fetchCategoriesRequest,
    fetchCategoryRequest
} from "../../store/actions/categoriesActions";
import Category from "./Category/Category";
import GridItem from "../../template/Grid/GridItem";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {
    Backdrop, Box,
    Fade,
    FormControl,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Modal,
    Paper, Radio,
    RadioGroup
} from "@material-ui/core";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import Grid from "@material-ui/core/Grid";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles(styles);

const Categories = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const categoryToDelete = useSelector(state => state.categories.category);

    const [open, setOpen] = useState(false);
    const [openListToDelete, setOpenListToDelete] = useState(false);
    const [cascadeDelete, setCascadeDelete] = useState('cascade');

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
    }, [dispatch])

    useEffect(() => {
        if(categoryToDelete) {
            if(categoryToDelete.transactions.length > 0) {
                setOpen(true);
            } else {
                dispatch(deleteCategoryRequest({deleteCategory : categoryToDelete.id}));
            }
        }
    }, [dispatch, categoryToDelete])

    const handleCheckToDelete = (id) => {
        dispatch(fetchCategoryRequest(id));
    }

    const handleChange = (event) => {
        setCascadeDelete(event.target.value);
    }

    const handleDeleteCategoryAndChangeTransactions = (id) => {
        dispatch(deleteCategoryRequest({deleteCategory: categoryToDelete.id, transactionsToCategory: id}));
        setOpenListToDelete(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cascadeDelete === 'cascade') {
            dispatch(deleteCategoryRequest({deleteCategory : categoryToDelete.id}));
            setOpen(false);
        } else {
            setOpen(false);
            setOpenListToDelete(true);
        }
    }

    return (
        <>
            <GridItem>
                {categories && categories.map(category => {
                    return <Category key={category.id} category={category} handleDelete={handleCheckToDelete}/>
                })}
                <GridItem>
                    <NavLink to={'/category/add'}><Button variant="contained" color="primary" >Add new category</Button></NavLink>
                </GridItem>
            </GridItem>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Paper>
                            <Grid>Are you sure you want to delete the {categoryToDelete && categoryToDelete.name} category?</Grid>
                            <Grid>There are {categoryToDelete && categoryToDelete.transactions.length} transactions in this category.</Grid>
                            <form onSubmit={handleSubmit}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup  defaultValue={cascadeDelete} aria-label="gender" name="gender1" value={cascadeDelete} onChange={handleChange}>
                                        <FormControlLabel value={'cascade'} control={<Radio />} label="Delete transactions along with category" />
                                        <FormControlLabel value={'notcascade'} control={<Radio />} label="Assign a different category to transactions (select from the list)" />
                                    </RadioGroup>
                                </FormControl>
                                <Grid item xs>
                                    <ButtonWithProgress
                                        type="submit" color="primary" variant="contained"
                                    >
                                        Submit
                                    </ButtonWithProgress>
                                </Grid>
                            </form>
                        </Paper>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openListToDelete}
                onClose={() => setOpenListToDelete(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openListToDelete}>
                    <div className={classes.paper}>
                        {categories && categories.map(category => {
                            return  <Box mb={1} key={category.id} onClick={() => handleDeleteCategoryAndChangeTransactions(category.id)}>
                                        <Paper>Category: {category.name} Type:{category.categoryType}</Paper>
                                    </Box>
                        })}
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default Categories;