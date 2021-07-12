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

When('нажимаю на кнопку Update user', str => {
    I.click(`//button//*[contains(text(),"Update user")]/..`);
});

When('я нажимаю на кнопку удаления пользователя из группы', () => {
    I.click(`//button[contains(@id,"deleted-button")]`);
});