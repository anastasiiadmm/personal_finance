const { I } = inject();

Given('я нахожусь на странице регистрации', () => {
    I.amOnPage('/signup');
});

Given('я нахожусь на странице логина', () => {
    I.amOnPage('/login');
});

When('я ввожу в поля текст:', table => {
    for (const id in table.rows) {
        if (id < 1) {
            continue;
        }

        const cells = table.rows[id].cells;
        const field = cells[0].value;
        const value = cells[1].value;

        I.fillField(field, value);
}});

Then('нажимаю на кнопку Sign up', () => {
    I.click(`//button[contains(@id,"signup-button")]`);
});

When('нажимаю на кнопку Sign in', () => {
    I.click(`//button[contains(@id,"signin-button")]`);
});

Then('вижу {string}', str => {
    I.see(str);
    I.wait(3)
});

Then('попадаю на страницу списка всех групп', () => {
    I.amOnPage('/groups');
});

Then('я загружаю картинку', () => {
    I.attachFile('form input[name=avatar]', '.././api/public/uploads/fixtures/group-icon.jpeg');
});

When('нажимаю на кнопку {string}', str => {
    I.click(`//button//*[contains(text(),"${str}")]/..`);
});

Then('попадаю на страницу группы New group', () => {
    I.amOnPage('/groups/3');
});

Then('я попадаю на страницу группы Test4', () => {
    I.amOnPage('/groups/4');
});

Then('попадаю на страницу группы Test5', () => {
    I.amOnPage('/groups/5');
});

Then('попадаю на страницу группы Test6', () => {
    I.amOnPage('/groups/6');
});

Then('попадаю на страницу группы Test7', () => {
    I.amOnPage('/groups/7');
});

Then('попадаю на страницу группы Test8', () => {
    I.amOnPage('/groups/8');
});

When('нажимаю на кнопку редактирования группы', () => {
    I.click(`//button[contains(@id,"edit-button")]`);
});

Then('загружаю картинку', () => {
    I.attachFile('form input[name=avatar]', '.././api/public/uploads/fixtures/group-icon2.webp');
});

Then('попадаю на страницу группы Test', () => {
    I.amOnPage('/groups/3');
});

When('нажимаю на кнопку удаления группы', () => {
    I.click(`//button[contains(@id,"delete-button")]`);
});

When('нажимаю на кнопку добавления юзера в группу', () => {
    I.click(`//button[contains(@id,"add-button")]`);
});

When('нажимаю на аватар пользователя', () => {
    I.click('//img[contains(@alt, "John Smith")]/..');
});

When('я нажимаю на select выбора роли у юзера', () => {
    I.click(`//div[contains(@id,"mui-component-select-role")]/..`);
});

When('нажимаю на admin', () => {
    I.click('//*[contains(text(),"admin")]');
});

When('нажимаю на кнопку {string}', str => {
    I.click(`//button//*[contains(text(),"${str}")]/..`);
});

When('нажимаю на кнопку Update user', () => {
    I.click(`//button//*[contains(text(),"Update user")]/..`);
});

When('я нажимаю на кнопку удаления пользователя из группы', () => {
    I.click(`//button[contains(@id,"deleted-button")]`);
});

Then('попадаю на страницу редактирования профиля у залогиненного пользователя', () => {
    I.amOnPage('/user');
});

When('редактирую данные в форме профиля', () => {
    I.click('//input[contains(@name, "displayName")]');
    I.fillField('//input[contains(@name, "displayName")]', 'John Test');
    I.click('//input[contains(@name, "preferences")]');
    I.click('//ul//li[contains(.,"Euro")]');
    I.attachFile('form input[name=avatar]', '.././api/public/uploads/fixtures/group-icon2.webp');
});

When('нажимаю нажимаю на кнопку Update profile', () => {
    I.click('//button//*[contains(text(),"Update profile")]/..');
    I.wait(2);
});