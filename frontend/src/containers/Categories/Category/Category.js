import React from 'react';
import {Box, Grid, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const Category = ({category, handleDelete, showButtons = false}) => {
    return (
       <Paper>
           <Box m={1}>
               <Grid
                   container
                   direction="row"
                   justify="space-between"
                   alignItems="baseline"
               >
                   <Grid>Category: {category && category.name}</Grid>
                   <Grid style={{padding: '0px 10px'}}>Type: {category && category.categoryType}</Grid>
                   {showButtons ?
                       <Grid>
                           <NavLink to={`/category/${category && category.id}`}>
                               <Button style={{maxWidth: '10px', maxHeight: '20px'}} variant="contained" color="primary">edit</Button>
                           </NavLink>
                           <Button style={{maxWidth: '10px', maxHeight: '20px'}} onClick={() => handleDelete(category.id)} variant="contained" color="secondary">delete</Button>
                       </Grid>
                       : <div></div>
                   }

               </Grid>
           </Box>
       </Paper>
    );
};

export default Category;