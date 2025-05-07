//classe LoginPage que encapsula toda a lógica da tela de login 
// (campos, botões e verificações), mantendo os testes limpos e legíveis - Boa prática

import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:3000');
  }

// Seletores para os campos de email e senha, e o botão de login - Boa prática
  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Senha' }).fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }

  async assertLoginPageVisible() {
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(this.page.getByText('Email')).toBeVisible();
    await expect(this.page.getByText('Senha')).toBeVisible();
  }

  async assertDashboardVisible() {
    await expect(this.page.getByRole('heading', { name: 'Gerenciamento de Usuários' })).toBeVisible();
    await expect(this.page.getByText('Autoestudo')).toBeVisible();
    await expect(this.page.getByText('Novo Usuário')).toBeVisible();
    await expect(this.page.getByText('Lista de Usuários')).toBeVisible();
  }
}
