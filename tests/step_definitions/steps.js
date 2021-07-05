const { I } = inject();

Given('я нахожусть на странице аутентификации', () => {
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

When('нажимаю на кнопку {string}', name => {
  I.click(`//button//*[contains(text(), "${name}")]/..`);
});

When('нажимаю на кнопку вывода Sidebar menu', () => {
  I.click(`//*[name()='svg']/*[name()='path' and @d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"]`);
});

When('я нажимаю на ссылку My Groups', () => {
  I.click('//*[@id="root"]/div/main/div[1]/div[2]/div/div/div[2]/ul/a[3]');
  I.wait(10);
});

When('попадаю на страницу списка всех групп', () => {
  I.amOnPage('/groups');
  I.wait(10)
});

When('я нажимаю на ссылку {string}', () => {
  // From "features/auth.feature" {"line":18,"column":5}
  throw new Error('Not implemented yet');
});

Then('появляется модальное окно с формой добавления новой группы', () => {
  // From "features/auth.feature" {"line":19,"column":5}
  throw new Error('Not implemented yet');
});

When('я ввожу в поля формы текст:', () => {
  // From "features/auth.feature" {"line":20,"column":5}
  throw new Error('Not implemented yet');
});

When('я нажимаю на кнопку {string}', () => {
  // From "features/auth.feature" {"line":23,"column":5}
  throw new Error('Not implemented yet');
});

Then('вижу {string}', () => {
  // From "features/auth.feature" {"line":24,"column":5}
  throw new Error('Not implemented yet');
});

When('вижу {string}', () => {
  // From "features/auth.feature" {"line":25,"column":5}
  throw new Error('Not implemented yet');
});
