import React, {useState} from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Tree from "../Tree";
import './TreeNode.css';
import Grid from "@material-ui/core/Grid";
import Category from "../../../containers/Categories/Category/Category";

const TreeNode = ({ node, handleDelete, showButtons}) => {
    const [childVisibility, setChildVisibility] = useState(false);

    const hasChild = node.subCategory ? true : false;

    return (
        <Grid component={'li'} className="d-tree-node border-0">
            <Grid container  onClick={(e) => setChildVisibility((v) => !v)}>
                {hasChild && (
                    <div
                        className={`d-inline d-tree-toggler ${
                            childVisibility ? "active" : ""
                        }`}
                    >
                        <ArrowRightIcon/>
                    </div>
                )}
                {/*{children && children}*/}
                <Category category={node} handleDelete={handleDelete} showButtons={showButtons}/>
                {/*<div className="col d-tree-head">*/}
                {/*    <i className={`mr-1 ${node.icon}`}> </i>*/}
                {/*    {node.name}*/}
                {/*</div>*/}
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