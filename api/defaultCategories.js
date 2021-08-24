 const categoryDefault = (userId) => ([{
    userId: userId,
    name: "Groceries",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Salary",
    categoryType: 'income',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Deposit",
    categoryType: 'income',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Gift",
    categoryType: 'income',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Transfer",
    categoryType: 'transfer',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Housing",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Transportation",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Utilities",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Clothing",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Medical/Healthcare",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Personal",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Debt",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Retirement",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Education",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Gifts/Donations",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Entertainment",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Alcohol and/or bars",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Games",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Movies",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: userId,
    name: "Subscriptions (Netflix, Amazon, Hulu, etc.)",
    categoryType: 'expenditure',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]);

 module.exports = {
   categoryDefault
 };
