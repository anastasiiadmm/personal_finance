import React, {useState} from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Tree from "../Tree";
import './TreeNode.css';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import Category from "../../../containers/Categories/Category/Category";

const useStyles = makeStyles(theme => ({
  arrowContainer: {
    width: '25px',
    paddingTop: '8px'
  },

}));

const TreeNode = ({node, handleDelete, showButtons}) => {
  const classes = useStyles();
  const [childVisibility, setChildVisibility] = useState(false);

  const hasChild = node.subCategory.length > 0 ;

  return (
    <Grid component={'li'}>
      <Grid container onClick={() => setChildVisibility((v) => !v)}>
        <Grid item  className={classes.arrowContainer}>
          <div className={`d-inline d-tree-toggler ${
            childVisibility ? "active" : ""
          }`}>
            {hasChild && (<ArrowRightIcon/>)}
          </div>
        </Grid>
        <Category category={node} handleDelete={handleDelete} showButtons={showButtons}/>
      </Grid>
      {hasChild && childVisibility && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.subCategory} handleDelete={handleDelete} showButtons={showButtons}/>
          </ul>
        </div>
      )}
    </Grid>
  );
};

export default TreeNode;