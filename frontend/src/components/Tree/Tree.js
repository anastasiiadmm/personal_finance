import React from 'react';
import TreeNode from "./TreeNode/TreeNode";
import './Tree.css';
import Category from "../../containers/Categories/Category/Category";

const Tree = ({ data = [], handleDelete, showButtons}) => {
    return (
        <div>
            <ul className="d-flex d-tree-container flex-column">
                {data.map((tree) => (
                    <TreeNode node={tree} handleDelete={handleDelete} key={tree.id} showButtons={showButtons}/>
                ))}
            </ul>
        </div>
    );
};

export default Tree;