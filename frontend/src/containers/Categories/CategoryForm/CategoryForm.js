import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {
    createCategoryRequest, fetchCategoriesRequest,
    fetchCategoryRequest, fetchCategorySuccess,
    updateCategoryRequest
} from "../../../store/actions/categoriesActions";
import FileInput from "../../../components/UI/Form/FileInput";
import {updateCategory} from "../../../store/sagas/categoriestSagas";
import {useParams} from "react-router-dom";
import {Autocomplete} from "@material-ui/lab";
import {MenuItem, TextField} from "@material-ui/core";

const CategoryForm = () => {

    const dispatch = useDispatch();
    const categoryToUpdate = useSelector(state => state.categories.category);
    const params = useParams();
    const categories = useSelector(state => state.categories.categories);

    const [category, setCategory] = useState({
        name: '',
        categoryType: '',
        categoryIcon: '',
        category: 0
    });

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
    }, []);

    useEffect(() => {
        if (params.id) {
            dispatch(fetchCategoryRequest(params.id));
        }
    }, [params.id])

    useEffect(() => {
        if (categoryToUpdate) {
            setCategory(categoryToUpdate);
            setUpdate(true);
        }

        return () => {
            dispatch(fetchCategorySuccess(null));
        }
    }, [categoryToUpdate])

    const handleChange = (event) => {
        const {name, value} = event.target;

        setCategory(prevState => ({...prevState, [name]: value}));
    }

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setCategory(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.keys(category).forEach(key => {
            formData.append(key, category[key]);
        });
        if(update) {
            return  dispatch(updateCategoryRequest({category, id: params.id}))
        }
        dispatch(createCategoryRequest(formData));
    }

    // const getFieldError = fieldName => {
    //     try {
    //         return error.errors[fieldName].message;
    //     } catch (e) {
    //         return undefined;
    //     }
    // };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Grid container direction="column" spacing={2}>
                <FormElement
                    required
                    label="Name"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    // error={getFieldError('accountName')}
                />

                <FormElement
                    required
                    label="Category type"
                    name="categoryType"
                    value={category.categoryType}
                    onChange={handleChange}
                    // error={getFieldError('balance')}
                />

                <TextField
                    required
                    label="Category"
                    name="category"
                    value={category.category}
                    onChange={handleChange}
                    select={true}>
                    {categories.map(cat => (
                        <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </TextField>


                <Grid item xs>
                    <FileInput
                        name="categoryIcon"
                        label="Image"
                        onChange={fileChangeHandler}
                        // error={getFieldError('avatarGroup')}
                    />
                    {console.log(category, 'tess!!!!!')}
                </Grid>

                <Grid item xs>
                    <ButtonWithProgress
                        type="submit"
                        color="primary"
                        variant="contained"
                        // loading={loading}
                        // disabled={loading}
                    >
                        Create
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default CategoryForm;