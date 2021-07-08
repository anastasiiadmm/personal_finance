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
  }
});

When('нажимаю на кнопку Sign up', () => {
  I.click(`//button[contains(@id,"signup-button")]`);
});

When('нажимаю на кнопку Sign in', () => {
  I.click(`//button[contains(@id,"signin-button")]`);
});

Then('вижу {string}', str => {
  I.see(str);
});

Then('попадаю на страницу списка всех групп', () => {
  I.amOnPage('/groups');
});

Then('я нажимаю на кнопку Add new group', () => {
  I.click(`//button//*[contains(text(),"Add new group")]/..`);
});

When('нажимаю на кнопку Create', () => {
  I.click(`//button//*[contains(text(),"Create")]/..`);
});

