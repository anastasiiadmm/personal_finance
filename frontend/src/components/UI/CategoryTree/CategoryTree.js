import React from 'react';
import Grid from "@material-ui/core/Grid";
import {TreeView} from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import StyledTreeItem from "../../../template/StyledTreeItem/StyledTreeItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from "../../../assets/jss/material-dashboard-react/components/categoryTreeStyle";

const useStyles = makeStyles(styles);

const CategoryTree = ({categories, chooseCategory}) => {
  const classes = useStyles();


  const categoryItem = categories => (
    categories.map((category) => (
      <div key={category.id}>
        <StyledTreeItem nodeId={category.id.toString()} labelText={category.name}
                        labelIcon={category.icon ? category.icon : undefined}
                        labelInfo={category.subCategory ? category.subCategory.length : null}
                        color="#9c27b0"
                        bgColor="#fcefe3"
                        onLabelClick={() => chooseCategory({id: category.id, name: category.name})}
        >
          {category.subCategory ? <>{categoryItem(category.subCategory)}</> : null}
        </StyledTreeItem>
      </div>
    ))
  )
  return (
    <Grid item xs>
      <TreeView
        className={classes.treeCategory}
        defaultExpanded={['1']}
        defaultCollapseIcon={<ArrowDropDownIcon/>}
        defaultExpandIcon={<ArrowRightIcon/>}
      >
        {categoryItem(categories)}
      </TreeView>
    </Grid>
  );
};

export default CategoryTree;