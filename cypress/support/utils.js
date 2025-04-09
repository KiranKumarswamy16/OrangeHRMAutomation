// Custom Delay Function (Avoid using cy.wait() directly)


// export function customDelay(milliseconds) {
//     return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }

export function waitForElementToLoad(milliseconds=2000) {
    cy.wait(milliseconds);  // Cypress built-in waiting
}


// Assertion Function to Validate Element Text


// export function assertText(selector, expectedText) {
//     cy.get(selector).should('be.visible').invoke('text').then((actualText) => {
//         expect(actualText.trim()).to.eq(expectedText);
//     });
// }

export function assertText(expectedText) {
    cy.contains(expectedText, { timeout: 10000 }) // Wait for the text to appear
      .should('be.visible')
      .invoke('text')
      .then((actualText) => {
          expect(actualText.trim()).to.eq(expectedText);
      });
}
