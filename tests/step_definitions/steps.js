const { I } = inject();

Given('я нахожусь на странице регистрации', () => {
    I.amOnPage('/signup');
    I.wait(10);
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
});
