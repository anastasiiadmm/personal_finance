const express = require('express');
// const {authJwt} = require("../middleware");
const {Category} = require("../models");
const upload = require('../multer').categoryIcon;

const router = express.Router();

router.post('/', upload.single('categoryIcon'), async (req, res) => {

    try {
        const CategoryResponse = await Category.create({
            name: req.body.name,
            icon: req.file ? req.file.filename : null,
            categoryType: req.body.categoryType,
            category: req.body.category,
            user: req.body.user,
        });
        res.status(200).send(CategoryResponse);
    } catch (e) {
        return res.status(400).send({message : e.message});
    }

});

router.get('/', async (req, res) => {

    try {
        const CategoryResponse = await Category.findAll({include: ['subCategory']});
        res.status(200).send(CategoryResponse);
    } catch (e) {
        return res.status(400).send({message : e.message});
    }

});

module.exports = router;