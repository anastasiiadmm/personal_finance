const express = require('express');
const auth = require("../middleware/auth");
const {Category, User} = require("../models");
const upload = require('../multer').categoryIcon;

const router = express.Router();

router.post('/', auth, upload.single('categoryIcon'), async (req, res) => {

    try {
        const CategoryResponse = await Category.create({
            name: req.body.name,
            icon: req.file ? req.file.filename : null,
            categoryType: req.body.categoryType,
            category: req.body.category,
            userId: req.user.id
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

router.get('/:id', async (req, res) => {

    try {
        const CategoryResponse = await Category.findOne({where: {id: req.params.id}, include: ['subCategory']});
        res.status(200).send(CategoryResponse);
    } catch (e) {
        return res.status(400).send({message : e.message});
    }
});

router.put('/:id', async (req, res) => {

    try {
       await Category.update(req.body, {where: {id: req.params.id}});

       const categoryResponse = await Category.findOne({where: {id: req.params.id}, include: ['subCategory']});
       res.status(200).send(categoryResponse);

    } catch (e) {
        return res.status(400).send({message : e.message});
    }
});

router.delete('/:id', async (req, res) => {

    try {
        await Category.destroy({where: {id: req.params.id}});
        
        res.status(200).send({message : 'deleted!'});

    } catch (e) {
        return res.status(400).send({message : e.message});
    }
});

module.exports = router;