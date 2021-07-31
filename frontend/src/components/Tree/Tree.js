import React from 'react';
import TreeNode from "./TreeNode/TreeNode";
import './Tree.css';

const Tree = ({ data = [] , handleDelete}) => {
    return (
        <div>
            <ul className="d-flex d-tree-container flex-column">
                {data.map((tree) => (
                    <TreeNode node={tree} handleDelete={handleDelete}/>
                ))}
            </ul>
        </div>
    );
};

export default Tree;