import { test, expect } from '@playwright/test';

test('Login e visualização da tela de gerenciamento de usuários', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Email')).toBeVisible();
  await expect(page.getByText('Senha')).toBeVisible();

  await page.getByRole('textbox', { name: 'Email' }).fill('vitorloula3@gmail.com');
  await page.getByRole('textbox', { name: 'Senha' }).fill('123');

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.getByRole('heading', { name: 'Gerenciamento de Usuários' })).toBeVisible();
  await expect(page.getByText('Autoestudo')).toBeVisible();
  await expect(page.getByText('Novo Usuário')).toBeVisible();
  await expect(page.getByText('Lista de Usuários')).toBeVisible();
});
