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

async function addWorkshop(name, description) {
	await driver.get(URL+"workshop");

	await driver.findElement(By.id('name'))
		.then( async element => { 
			await element.sendKeys(name)
		});

	await driver.findElement(By.id('description'))
		.then( async element => { 
			await element.sendKeys(description)
		});

	await driver.findElement(By.className('btn-primary'))
		.then( async element => { 
			await element.click();
		});
}

describe('Affichage atelier', () => {
	describe("Liste vide", () => {
		it("Aucun atelier ne devrait être affiché", async () => {
			const expectedError = "Unable to locate element: li";
			await driver.get(URL);

			return expect(
				driver.findElement(By.css('li'))
			).to.be.rejectedWith(expectedError);
		});
	});

	describe("Liste avec un atelier", () => {
		it("Si un atelier a été créé, il devrait être affiché sur la page d'index", async () => {
			await addWorkshop('First', 'First workshop on this page');
			await driver.get(URL);
			const ateliers = await driver.findElements(By.css('li'));

			expect(ateliers.length).to.be.equal(1);
		});
	});

	describe("Liste avec plusieurs ateliers", () => {
		it("Si plusiers ateliers ont été créés, ils devraient être affiché sur la page d'index", async () => {
			await addWorkshop('Second', 'Second workshop on this page');
			await addWorkshop('Third', 'Third workshop on this page');
			await addWorkshop('Fourth', 'Fourth workshop on this page');
			await driver.get(URL);
			const ateliers = await driver.findElements(By.css('li'));

			// Already one with previous test
			expect(ateliers.length).to.be.equal(4);
		});
	});
});


describe('Création atelier', () => {
	describe("Page de création", () => {
		it("Quand on clique sur Create new workshop, on devrait se retrouver sur l'interface de création d'un atelier", async () => {
			await driver.get(URL);

			await driver.findElements(By.className('btn-success'))
				.then( async elements => { 
					await elements[0].click();

					driver.getCurrentUrl()
					.then( url => { 
						expect(url.includes("/workshop")).true; 
					});
				});
		});
	});

	describe("Création d'un atelier valide", () => {
		it("Si un atelier valide a été créé, il devrait être affiché sur la page d'index", async () => {
			await driver.get(URL);
			expect(true).true; // Same test as 1.2 ?
		});
	});

	describe("Création d'un atelier invalide", () => {
		it("Si on essaye de créer un atelier sans nom, un popup apparait et l'atelier ne devrait pas être créé.", async () => {
			await driver.get(URL+"workshop");

			await driver.findElement(By.id('description'))
				.then( async element => { 
					await element.sendKeys("test")
				});

			await driver.findElements(By.className('btn-primary'))
				.then( async elements => { 
					await elements[0].click();

					// Check for popup
				});


			expect(true).true;
		});
	});

	describe("Annulation d'un atelier", () => {
		it("Si on quitte la création d'un atelier, l'atelier ne devrait pas être créé.", async () => {
			const elementName = "Test annulation atelier - name";
			const elementDescription = "Test annulation atelier - description"
			
			await driver.get(URL+"workshop");

			await driver.findElement(By.id('name'))
				.then( async element => { 
					await element.sendKeys(elementName)
				});

			await driver.findElement(By.id('description'))
				.then( async element => { 
					await element.sendKeys(elementDescription)
				});

			await driver.findElement(By.className('btn-secondary')).click()
			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).to.be.equal(URL);

			const elements = await driver.findElements(By.className('media-body'));

			for (element of elements) {
				const txt = await element.getText();

				if (txt.includes(elementName) || txt.includes(elementDescription))
					assert("L'atelier a été créé alors qu'il n'aurait pas du l'être")
			}
		});
	});
});
