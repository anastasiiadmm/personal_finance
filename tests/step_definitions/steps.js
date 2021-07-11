const { I } = inject();

Given('я нахожусь на странице регистрации', () => {
    I.amOnPage('/signup');
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
    }
});

When('нажимаю на кнопку Sign up', () => {
    I.click(`//button[contains(@id,"signup-button")]`);
});

Then('вижу {string}', str => {
    I.see(str);
});
