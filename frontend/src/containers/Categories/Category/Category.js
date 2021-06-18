import React from 'react';
import GridItem from "../../../template/Grid/GridItem";

const Category = ({category}) => {
    return (
        <GridItem>
            <span>Category: {category.name}</span>
            <span>____</span>
            <span>Type: {category.categoryType}</span>
        </GridItem>
    );
};

export default Category;