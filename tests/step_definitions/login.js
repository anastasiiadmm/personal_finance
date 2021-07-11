const { I } = inject();

const users = {
    'johndoe@test.com': '1qaz@WSX29'
}

Given('я залогинен как пользователь {string}', (email) => {
    I.amOnPage('/login');
    I.fillField('email', email);
    I.fillField('password', users[email]);
    I.click(`//button[contains(@id,"signin-button")]`);
    I.see("Login successful");
});