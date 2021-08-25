import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import Button from "../../../components/UI/CustomButtons/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {blackColor, grayColor, hexToRgb} from "../../../assets/jss/material-dashboard-react";
import {useDispatch} from "react-redux";
import {historyPush} from "../../../store/actions/historyActions";
import Danger from "../../../components/UI/Typography/Danger";

const useStyles = makeStyles(theme => ({
  categoryContainer: {
    width: 'calc(100% - 25px)',
    borderBottom: '1px solid black',
    "&:hover,&:focus": {
      backgroundColor: grayColor[10],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.2)",
    },
  },
}));

const Category = ({category, handleDelete, showButtons = false}) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  return (
    <Grid
      item
      container
      className={classes.categoryContainer}
      direction="row"
      alignItems="center"
    >
      <Grid item xs={5}>{category && category.name}</Grid>
      <Grid item xs={4} style={{padding: '0px 10px'}}>{category && category.categoryType}</Grid>
      {showButtons ?
        <Grid item container  justify="flex-end" xs={3}>
          <Button size={'sm'} justIcon onClick={() => dispatch(historyPush(`/category/${category && category.id}`))}
                  color="transparent"><EditIcon/></Button>
          <Button size={'sm'} justIcon onClick={() => handleDelete(category.id)}
                  color="transparent"><Danger><DeleteForeverIcon/></Danger></Button>
        </Grid>
        : null
      }

    </Grid>
  );
};

export default Category;