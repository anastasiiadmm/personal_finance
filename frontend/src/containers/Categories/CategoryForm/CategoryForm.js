import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {
  createCategoryRequest,
  fetchCategoriesRequest,
  fetchCategoryRequest,
  fetchCategorySuccess,
  updateCategoryRequest
} from "../../../store/actions/categoriesActions";
import FileInput from "../../../components/UI/Form/FileInput";
import {useParams} from "react-router-dom";
import Button from "../../../components/UI/CustomButtons/Button";
import CategoryIcon from "@material-ui/icons/Category";
import {whiteColor} from "../../../assets/jss/material-dashboard-react";
import ComponentTree from "../../../components/UI/ComponentTree/ComponentTree";
import DialogContainer from "../../../components/UI/DialogContainer/DialogContainer";

const CategoryForm = () => {

  const dispatch = useDispatch();
  const categoryToUpdate = useSelector(state => state.categories.category);
  const params = useParams();
  const categories = useSelector(state => state.categories.categories);
  const categoryType = [{id: 'income', name: 'Income'}, {id: 'expenditure', name: 'Expenditure'}, {
    id: 'transfer',
    name: 'Transfer'
  }];

  const [openDialog, setOpenDialog] = useState({category: false});

  const [category, setCategory] = useState({
    name: '',
    categoryType: '',
    categoryIcon: '',
    parentCategory: ''
  });

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchCategoryRequest(params.id));
    }
  }, [dispatch, params.id])

  useEffect(() => {
    if (categoryToUpdate) {
      const parent = categories.find(category => category.id === categoryToUpdate.parentCategory)
      setCategory({
        ...category,
        name: categoryToUpdate.name,
        categoryType: categoryToUpdate.categoryType,
        categoryIcon: categoryToUpdate.categoryIcon,
        parentCategory: parent ? parent : ''
      });
      setUpdate(true);
    }

    return () => {
      dispatch(fetchCategorySuccess(null));
    }
  }, [dispatch, categoryToUpdate, category, categories])

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

  const handleDialogOpen = (type) => {
    setOpenDialog({...openDialog, [type]: !openDialog[type]})
  }

  const handleClose = (type) => {
    setOpenDialog({...openDialog, [type]: false});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(category).forEach(key => {
      if (key === 'parentCategory') {
        if (category[key].id) {
          formData.append(key, category[key]?.id);
        }
      } else {
        formData.append(key, category[key]);
      }
    });
    if (update) {
      return dispatch(updateCategoryRequest({formData, id: params.id}))
    }
    dispatch(createCategoryRequest(formData));
  }


  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container direction="column" spacing={2}>
        <FormElement
          required
          label="Name"
          size={'small'}
          name="name"
          value={category.name}
          onChange={handleChange}
        />
        <FormElement
          size="small"
          label="Category type"
          select
          onChange={handleChange}
          name="categoryType"
          value={category.categoryType}
          options={categoryType}/>

        <Grid item container spacing={1}>

          <Grid item container xs={6} alignItems="center">
            <Button block color={'grey'}
                    inputStyled
                    onClick={() => handleDialogOpen('category')}>
              {category.parentCategory?.name ? category.parentCategory.name : 'Parent category'}
              {<CategoryIcon/>}
            </Button>
            <DialogContainer style={{
              minWidth: '335px', maxWidth: '335px', backgroundColor: whiteColor,
              boxShadow: 'none',
            }} open={openDialog.category} handleClose={() => handleClose('category')}>
              <ComponentTree items={categories} chooseItem={(prop) => setCategory({...category, parentCategory: prop})}
                             recursive={true}/>
            </DialogContainer>
          </Grid>
          <Grid item xs={6}>
            <FileInput
              name="categoryIcon"
              label="Image"
              hideInput
              xs={12}
              buttonInput
              onChange={fileChangeHandler}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            block
            type="submit"
            color={'success'}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;