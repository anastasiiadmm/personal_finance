import React from 'react';
import TreeNode from "./TreeNode/TreeNode";
import './Tree.css';

const Tree = ({ data = [], handleDelete, showButtons}) => {
    return (
            <ul className="d-flex d-tree-container flex-column">
                {data.map((tree) => (
                    <TreeNode node={tree} handleDelete={handleDelete} key={tree.id} showButtons={showButtons}/>
                ))}
            </ul>
    );
};

export default Tree;