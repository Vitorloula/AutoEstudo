import {expect, test} from "@playwright/test";

test.beforeEach( async ({page}) =>{
  await page.goto("http://localhost:3000/usuarios")
})

test("Edição de um usuário bem sucedida", async ({page}) =>{
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Usuário atualizado com sucesso!')
    await dialog.accept()
  })

  await page.locator("[data-test='edit-button']").first().click()

  const newName = "userTest" + Math.trunc(Math.random() * 1000)

  await page.locator("[data-test='name-dialog'] input").fill(newName)
  await expect(page.locator("[data-test='name-dialog'] input")).toHaveValue(newName)

  await page.locator("[data-test='checkbox-dialog']").click()

  await page.locator("[data-test='save-dialog']").click()

  await page.waitForTimeout(1000)
})

test("Exclusão de um usuário mal sucedida", async ({page}) =>{
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Usuário ativo não pode ser excluído.')
    await dialog.accept()
  })

  await page.locator("[data-test='delete-button']").first().click()

  await page.waitForTimeout(1000)

})
