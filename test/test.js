const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { Builder, By, Key, until } = require('selenium-webdriver');

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;


const URL = "http://localhost:3000/";

let driver;

before(function (done) {
	(async () => {
		driver = await new Builder().forBrowser('firefox').build();
	})().then(done);
});

after(() => {
	driver.close();
})

describe('Affichage atelier', () => {
	// describe('Test webdriver', () => {
	// 	it('Should show firefox browser, and go to google home page', async () => {
	// 		await driver.get("http://www.google.com/ncr");
	// 		await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
	// 		await driver.wait(until.titleIs('webdriver - Recherche Google'), 10000);

	// 		expect(true).true;
	// 	});
	// });

	describe("Liste vide", () => {
		it("Aucun atelier ne devrait être affiché", async () => {
			// TODO

			const expectedError = "Unable to locate element: li";
			await driver.get(URL);
			// driver.findElement(By.css('li'))
			return expect(driver.findElement(By.css('li'))).to.be.rejectedWith(expectedError);
		});
	});

	describe("Liste avec un atelier", () => {
		it("Si un atelier a été créé, il devrait être affiché sur la page d'index", async () => {
			// TODO
			await driver.get(URL);
			expect(true).true;
		});
	});

	describe("Liste avec plusieurs ateliers", () => {
		it("Si plusiers ateliers ont été créés, ils devraient être affiché sur la page d'index", async () => {
			// TODO
			await driver.get(URL);
			expect(true).true;
		});
	});
});


describe('Création atelier', () => {
	describe("Page de création", () => {
		it("Quand on clique sur Create new workshop, on devrait se retrouver sur l'interface de création d'un atelier", async () => {
			// TODO
			await driver.get(URL);
			expect(true).true;
		});
	});

	describe("Création d'un atelier valide", () => {
		it("Si un atelier valide a été créé, il devrait être affiché sur la page d'index", async () => {
			// TODO
			await driver.get(URL);
			expect(true).true;
		});
	});

	describe("Création d'un atelier invalide", () => {
		it("Si on essaye de créer un atelier sans nom, un popup apparait et l'atelier ne devrait pas être créé.", async () => {
			// TODO
			await driver.get(URL);
			expect(true).true;
		});
	});

	describe("Annulation d'un atelier", () => {
		it("Si on quitte la création d'un atelier, l'atelier ne devrait pas être créé.", async () => {
			// TODO
			await driver.get(URL);
			expect(true).true;
		});
	});
});
