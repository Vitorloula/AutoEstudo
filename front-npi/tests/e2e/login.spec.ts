import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { expectDialogMessage } from './utils/dialogUtils';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Login com sucesso leva à tela de gerenciamento', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.assertLoginPageVisible();
  await loginPage.fillEmail('vitorloula3@gmail.com');
  await loginPage.fillPassword('123');

  page.once('dialog', dialog => dialog.dismiss().catch(() => {}));

  await loginPage.submit();
  await loginPage.assertDashboardVisible();
});

test('Login inválido exibe mensagem de erro', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.fillEmail('vitorloula@gmail.com');
  await loginPage.fillPassword('1313');

  await expectDialogMessage(page, 'E-mail ou senha incorretos.');

  await loginPage.submit();
  await loginPage.assertLoginPageVisible();
});
