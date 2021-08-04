import React from 'react';
import Grid from "@material-ui/core/Grid";
import {TreeView} from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import StyledTreeItem from "../StyledTreeItem/StyledTreeItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from "../../../assets/jss/material-dashboard-react/components/categoryTreeStyle";

const useStyles = makeStyles(styles);

const ComponentTree = ({items, chooseItem, recursive, subName}) => {
  const classes = useStyles();


  const categoryItem = items => (
    items.map((item) => (
      <div key={item.id}>
        <StyledTreeItem nodeId={item.id.toString()} labelText={item.name}
                        labelIcon={item.icon ? item.icon : undefined}
                        labelInfo={item.subCategory ? item.subCategory.length.toString() : null}
                        color="#9c27b0"
                        bgColor="#fcefe3"
                        onLabelClick={() => chooseItem({id: item.id, name: item.name})}
        >
          {item.subCategory ? <>{categoryItem(item.subCategory)}</> : null}
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
        {recursive ? categoryItem(items) :
          <>{items.map((itemParent) => (
            <div key={itemParent.id}>
              <StyledTreeItem nodeId={itemParent.id.toString()} labelText={itemParent.title + ' group'}
                              labelIcon={itemParent.avatar ? itemParent.avatar : undefined}
                              labelInfo={subName === 'accounts' ? itemParent.users[0].GroupUsers.role : null}
                              color="#9c27b0"
                              bgColor="#fcefe3"
              >
                {itemParent[subName] ? <>{itemParent[subName].map((item) => (
                    <div key={item.id}>
                      <StyledTreeItem nodeId={item.id.toString()} labelText={item.accountName}
                                      labelIcon={item.accountIcon ? item.accountIcon : undefined}
                                      labelInfo={item.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + item?.currency}
                                      color="#9c27b0"
                                      bgColor="#fcefe3"
                                      onLabelClick={() => chooseItem({
                                        id: item.id,
                                        groupId: itemParent.id,
                                        name: item.accountName,
                                      })}
                      />
                    </div>
                  ))}</>
                  : null}
              </StyledTreeItem>
            </div>
          ))}
          </>
        }
      </TreeView>
    </Grid>
  );
};

export default ComponentTree;