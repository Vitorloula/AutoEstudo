// Reuso com funções e componentes reutilizáveis - Boa pratica
import { Page, expect } from '@playwright/test';

export async function expectDialogMessage(page: Page, expectedMessage: string) {
  page.once('dialog', async dialog => {
    console.log(`Dialog: ${dialog.message()}`);
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.dismiss();
  });
}
