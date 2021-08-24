const express = require('express');
const auth = require("../middleware/auth");
const {Category, Transaction} = require("../models");
const upload = require('../multer').categoryIcon;

const router = express.Router();


router.post('/', auth, upload.single('categoryIcon'), async (req, res) => {
  try {

    const categoryData = {
      name: req.body.name,
      icon: req.file ? req.file.filename : null,
      categoryType: req.body.categoryType,
      userId: req.user.id,
    };

    if (req.body.parentCategory !== '') {
      categoryData.parentCategory = req.body.parentCategory;
      categoryData.sub = true;
    }
    const CategoryResponse = await Category.create(categoryData);
    res.status(200).send(CategoryResponse);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }

});

router.get('/', auth, async (req, res) => {

  try {
    const CategoryResponse = await Category.findAll({
      where: {userId: req.user.id, sub: null},
      include: {model: Category, as: 'subCategory'}
    });

    res.status(200).send(CategoryResponse);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.get('/:id', async (req, res) => {

  try {
    const CategoryResponse = await Category.findOne({
      where: {id: req.params.id},
      include: ['subCategory', 'transactions']
    });
    res.status(200).send(CategoryResponse);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.put('/:id', async (req, res) => {

  try {
    await Category.update(req.body, {where: {id: req.params.id}});

    const categoryResponse = await Category.findOne({where: {id: req.params.id}, include: ['subCategory']});
    res.status(200).send(categoryResponse);

  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.delete('/:id/:newId?', async (req, res) => {
  try {
    if (req.params.newId) {
      const CategoryResponse = await Category.findOne({
        where: {id: req.params.id},
        include: ['subCategory', 'transactions']
      });
      const changedTransactions = CategoryResponse.get({plain: true}).transactions.map(transaction => {
        return {...transaction, categoryId: parseInt(req.params.newId)};
      });

      const result = changedTransactions.map(async transaction => {
        return await Transaction.update(transaction, {where: {id: transaction.id}});
      });

      Promise.all(result);
      await Category.destroy({where: {id: req.params.id}});
      return res.status(200).send({message: 'deleted!'});
    }
    const CategoryResponse = await Category.findOne({
      where: {id: req.params.id},
      include: ['subCategory', 'transactions']
    });
    const transactions = CategoryResponse.get({plain: true}).transactions;

    const result = transactions.map(async transaction => {
      return await Transaction.destroy({where: {id: transaction.id}});
    });
    Promise.all(result);

    await Category.destroy({where: {id: req.params.id}});
    return res.status(200).send({message: 'deleted!'});

  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

module.exports = router;