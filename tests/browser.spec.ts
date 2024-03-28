import { expect, type Page, test } from '@playwright/test';
import { RoutesEnums } from '../src/domain/helpers/enums/RoutesEnums';

async function fillAndSendForm(page: Page): Promise<void> {
	await page.fill('input[name="name"]', 'John Doe');
	await page.fill('input[name="phone"]', '123456789');
	await page.fill('input[name="email"]', 'john@example.com');
	await page.click('button[type="submit"]');
	expect(page.url().includes(RoutesEnums.CANDIDATE));
}

test('Loading of Challenge components', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await expect(page.getByRole('heading', { name: 'Desafio' })).toBeVisible();
	expect(await page.isVisible('input[name="name"]')).toBeTruthy();
	expect(await page.isVisible('input[name="phone"]')).toBeTruthy();
	expect(await page.isVisible('input[name="email"]')).toBeTruthy();
	expect(await page.isVisible('button[type="submit"]')).toBeTruthy();
	expect(await page.textContent('button')).toContain('Candidato');
});

test('Button candidate to disabled', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);
	const isButtonDisabled = await page.$eval(
		'button',
		(button) => button.textContent === 'Candidato' && button.disabled
	);
	expect(isButtonDisabled).toBeTruthy();
});

test('Fill and submission of the form', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await fillAndSendForm(page);
});

test('Button candidate/challenge is able after fill form', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await fillAndSendForm(page);

	const isButtonChallengeEnabled = await page.$eval(
		'button',
		(button) => button.textContent === 'Desafio' && !button.disabled
	);

	expect(isButtonChallengeEnabled).toBeTruthy();

	await page.click('button:has-text("Desafio")');

	expect(page.url().includes(RoutesEnums.HOME));

	await page.click('button:has-text("Candidato")');

	expect(page.url().includes(RoutesEnums.CANDIDATE));
});

test('Submission of the form with empty fields', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await page.click('button[type="submit"]');

	expect(await page.isVisible('input[name="name"]:invalid')).toBeTruthy();
	expect(await page.isVisible('input[name="phone"]:invalid')).toBeTruthy();
	expect(await page.isVisible('input[name="email"]:invalid')).toBeTruthy();
});

test('Navigate to the challenge page without filling out the form', async ({ page }) => {
	await page.goto(RoutesEnums.CANDIDATE);
	expect(page.url().includes(RoutesEnums.HOME));
});

test('Loading of Candidate components', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await fillAndSendForm(page);

	await expect(page.getByRole('heading', { name: 'Candidato' })).toBeVisible();
	const isNameVisible = await page.isVisible('h2:has-text("Nome: John Doe")');
	const isPhoneVisible = await page.isVisible('p:has-text("Telefone: 123456789")');
	const isEmailVisible = await page.isVisible('p:has-text("Email: john@example.com")');

	expect(isNameVisible).toBeTruthy();
	expect(isPhoneVisible).toBeTruthy();
	expect(isEmailVisible).toBeTruthy();

	expect(await page.isVisible('button:has-text("Enviar")'));
});

test('Send to challenge success', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await fillAndSendForm(page);

	await page.click('button:has-text("Enviar")');

	await page.waitForSelector('#dialog_challenge');

	const isDialogVisible = await page.isVisible('#dialog_challenge');

	expect(isDialogVisible).toBeTruthy();
});

test('Send to challenge failed', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await fillAndSendForm(page);

	await page.waitForSelector('#dialog_challenge');

	const isDialogTextVisible = await page.isVisible('p:has-text("Desafio finalizado com falha!")');

	expect(isDialogTextVisible).toBeTruthy();
});

test('Counter is not reset when changing pages', async ({ page }) => {
	await page.goto(RoutesEnums.HOME);

	await fillAndSendForm(page);

	await page.click('button:has-text("Desafio")');

	await page.waitForTimeout(1000);

	await page.click('button:has-text("Candidato")');

	expect(await page.isVisible('p:has-text("Tempo Restante: 15 segundos")')).not.toBeTruthy();
});
