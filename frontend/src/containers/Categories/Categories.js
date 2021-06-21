import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCategoryRequest, fetchCategoriesRequest} from "../../store/actions/categoriesActions";
import Category from "./Category/Category";
import GridItem from "../../template/Grid/GridItem";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteCategoryRequest(id));
    }

    return (
        <GridItem>
            {categories && categories.map(category => {
                return <Category key={category.id} category={category} handleDelete={handleDelete}/>
            })}
            <GridItem>
                <NavLink to={'/category/add'}><Button variant="contained" color="primary" >Add new category</Button></NavLink>
            </GridItem>
        </GridItem>
    );
};

export default Categories;