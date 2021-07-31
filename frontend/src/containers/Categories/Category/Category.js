import React from 'react';
import {Box, Grid, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const Category = ({category, handleDelete}) => {
    return (
       <Paper>
           <Box m={1}>
               <Grid
                   container
                   direction="row"
                   justify="space-between"
                   alignItems="baseline"
               >
                   <Grid>Category: {category.name}</Grid>
                   <Grid style={{padding: '0px 10px'}}>Type: {category.categoryType}</Grid>
                   <Grid>
                       <NavLink to={"/category/" + category.id}>
                           <Button style={{maxWidth: '10px', maxHeight: '20px'}} variant="contained" color="primary">edit</Button>
                       </NavLink>
                       <Button style={{maxWidth: '10px', maxHeight: '20px'}} onClick={() => handleDelete(category.id)} variant="contained" color="secondary">delete</Button>
                   </Grid>
               </Grid>
           </Box>
       </Paper>
    );
};

export default Category;