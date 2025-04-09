// export function getElementById(elementId) {
//     return cy.get(`#${elementId}`); // Using template literals
// }

// export function getElementByName(elementName) {
//     return cy.get(`[name="${elementName}"]`); // Using template literals
// }

// export function getElementByAnyClass(elementClass) {
//     return cy.get(`.${elementClass}`); // Using template literals
// }

// export function getElementByTagAndAttribute(tagName, attributeName, attributeValue) {
//     return cy.get(`${tagName}[${attributeName}="${attributeValue}"]`);
// }


// export function getElementByTagAndClass(tag, className,) {
//     return cy.get(`${tag}.${className}`);
// }

// export function getElementByTagAndClassAndText(tag, className, text) {
//     return cy.contains(`${tag}.${className}`, text);
// }

// export function getElementByText(text) {
//     return cy.contains(text);
// }

// export function getElementByTagAndText(tag, text) { 
//     return cy.contains(tag, text);
// }


// export function selectDropdownByParent(parentLocatorType, parentLocatorText, childLocatorType, childLocatorClass, childDropdownText) {
//     cy.contains(parentLocatorType, parentLocatorText).parent().next().find(`${childLocatorType}.${childLocatorClass}`).click();
//     cy.wait(500)
//     cy.contains(childDropdownText).click()
// }

// export function selectDropdownByClosest(childTag, childText, parentClass, parentSiblingChildLocatorType, parentSiblingChildLocatorClass, childDropdownText) {
//     cy.contains(childTag, childText).closest(`.${parentClass}`).find(`${parentSiblingChildLocatorType}.${parentSiblingChildLocatorClass}`).click()
//     cy.wait(500)
//     cy.contains(childDropdownText).click()
// }

// export function enterTextboxByParent(parentLocatorType, parentLocatorText, childLocatorType, childLocatorClass, Entertext) {
//     cy.contains(parentLocatorType, parentLocatorText).parent().next().find(`${childLocatorType}.${childLocatorClass}`).clear().type(Entertext);
// }


// export function enterTextboxByClosest(childTag, childText, parentClass, parentSiblingChildLocatorType, parentSiblingChildLocatorClass, Entertext) {
//     cy.contains(childTag, childText).closest(`.${parentClass}`).find(`${parentSiblingChildLocatorType}.${parentSiblingChildLocatorClass}`).clear().type(Entertext);
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const DEFAULT_TIMEOUT = 20000;

export function getElementById(elementId) {
    return cy.get(`#${elementId}`, { timeout: DEFAULT_TIMEOUT });
}

export function getElementByName(elementName) {
    return cy.get(`[name="${elementName}"]`, { timeout: DEFAULT_TIMEOUT });
}

export function getElementByAnyClass(elementClass) {
    return cy.get(`.${elementClass}`, { timeout: DEFAULT_TIMEOUT });
}

// export function getElementByTagAndAttribute(tagName, attributeName, attributeValue) {
//     return cy.get(`${tagName}[${attributeName}="${attributeValue}"]`, { timeout: DEFAULT_TIMEOUT });
// }

export function getElementByTagAndAttribute(tagName, attributeName, attributeValue) {
    return cy
        .get(`${tagName}[${attributeName}="${attributeValue}"]`, { timeout: DEFAULT_TIMEOUT })
        .should('exist')
        .should('be.visible');
}


export function getElementByTagAndClass(tag, className) {
    return cy.get(`${tag}.${className}`, { timeout: DEFAULT_TIMEOUT });
}

export function getElementByTagAndClassAndText(tag, className, text) {
    return cy.contains(`${tag}.${className}`, text, { timeout: DEFAULT_TIMEOUT });
}

export function getElementByText(text) {
    return cy.contains(text, { timeout: DEFAULT_TIMEOUT });
}

export function getElementByTagAndText(tag, text) { 
    return cy.contains(tag, text, { timeout: DEFAULT_TIMEOUT });
}

export function getElementByComplexCSS(selector) {
    return cy.get(selector, { timeout: DEFAULT_TIMEOUT });
}

export function selectDropdownByParent(parentLocatorType, parentLocatorText, childLocatorType, childLocatorClass, childDropdownText) {
    cy.contains(parentLocatorType, parentLocatorText, { timeout: DEFAULT_TIMEOUT })
        .parent()
        .next()
        .find(`${childLocatorType}.${childLocatorClass}`, { timeout: DEFAULT_TIMEOUT })
        .click();
    
    cy.wait(500);
    
    cy.contains(childDropdownText, { timeout: DEFAULT_TIMEOUT }).click();
}

export function selectDropdownByClosest(childTag, childText, parentClass, parentSiblingChildLocatorType, parentSiblingChildLocatorClass, childDropdownText) {
    cy.contains(childTag, childText, { timeout: DEFAULT_TIMEOUT })
        .closest(`.${parentClass}`)
        .find(`${parentSiblingChildLocatorType}.${parentSiblingChildLocatorClass}`, { timeout: DEFAULT_TIMEOUT })
        .click();
    
    cy.wait(500);
    
    cy.contains(childDropdownText, { timeout: DEFAULT_TIMEOUT }).click();
}

export function enterTextboxByParent(parentLocatorType, parentLocatorText, childLocatorType, childLocatorClass, enterText) {
    cy.contains(parentLocatorType, parentLocatorText, { timeout: DEFAULT_TIMEOUT })
        .parent()
        .next()
        .find(`${childLocatorType}.${childLocatorClass}`, { timeout: DEFAULT_TIMEOUT })
        .clear()
        .type(enterText);
}



// export function enterTextboxByClosest(childTag, childText, parentClass, parentSiblingChildLocatorType, parentSiblingChildLocatorClass, enterText) {
//     cy.contains(childTag, childText, { timeout: DEFAULT_TIMEOUT })
//         .closest(`.${parentClass}`)
//         .find(`${parentSiblingChildLocatorType}.${parentSiblingChildLocatorClass}`, { timeout: DEFAULT_TIMEOUT })
//         .clear()
//         .type(enterText);
// }

export function enterTextboxByClosest(childTag, childText, parentClass, parentSiblingChildLocatorType, parentSiblingChildLocatorClass, enterText) {
    cy.contains(childTag, childText, { timeout: DEFAULT_TIMEOUT })
        .should('exist')
        .closest(`.${parentClass}`)
        .find(`${parentSiblingChildLocatorType}.${parentSiblingChildLocatorClass}`, { timeout: DEFAULT_TIMEOUT })
        .should('exist')
        .should('be.visible').clear().type(enterText);
}




// export function enterTextboxByNearParents(childTag, childText, parentClass, parentSiblingAnyChildLocatorType, parentSiblingAnyChildLocatorClass, enterText) {
//     cy.contains(childTag, childText, { timeout: DEFAULT_TIMEOUT })
//         .parents(`.${parentClass}`)
//         .find(`${parentSiblingAnyChildLocatorType}[${parentSiblingAnyChildLocatorClass}]`, { timeout: DEFAULT_TIMEOUT })
//         .clear()
//         .type(enterText);
// }



export function enterTextboxByNearParents(childTag, childText, parentClass, parentSiblingAnyChildLocatorAttribute, enterText) {
    cy.contains(childTag, childText, { timeout: DEFAULT_TIMEOUT })
        .parents(`.${parentClass}`)
        .find(parentSiblingAnyChildLocatorAttribute, { timeout: DEFAULT_TIMEOUT })
        .clear()
        .type(enterText);
}



export function clickOnElementInsideClass(className, elementText) {
    return cy.get(`.${className}`).contains(elementText, { matchCase: false }).click();
}

// export function getSiblingText(containerClass, referenceText, targetClass) {
//     return cy.contains(`.${containerClass}`, referenceText, { matchCase: false, timeout: 10000 }) 
//         .should('be.visible') // Ensure element is visible
//         .closest(`.${containerClass}`) // Get the correct row
//         .find(`.${targetClass}`) // Locate the target element inside the same row
//         .should('exist') // Ensure the target element exists
//         .invoke('text') // Extract text
//         .then((text) => text.trim()); // Trim spaces for clean output
// }


// export function getSiblingText(containerClass, referenceText, targetClass) {
//     return cy.contains(`.${containerClass}`, referenceText.trim(), { matchCase: false, timeout: 10000 }) 
//         .should('be.visible') // Ensure reference text is visible
//         .parentsUntil('.oxd-table-card') // Move up safely until reaching the container
//         .within(() => { // Now search inside the row
//             cy.get(`.${targetClass}`).should('exist').invoke('text');
//         });
// }




export function getSiblingText(siblingClass, siblingText, containerParentClass, targetClassInsideClass) {
    return cy.contains(`.${siblingClass}`, siblingText.trim(), { matchCase: false, timeout: 10000 }) 
        .should('be.visible') // Ensure reference text is visible
        .parents(`.${containerParentClass}`) // Move up to the correct row
        .find({targetClassInsideClass}) // Locate the target element inside the row
        .should('exist') // Ensure the target element exists
        .invoke('text') // Extract text
        .then((text) => text.trim()); // Trim spaces for clean output
}


export function deleteRowByCellText(cellClass, cellText, rowClass, targetElementButtonClass) {
    cy.contains(cellClass, cellText, { timeout: DEFAULT_TIMEOUT })
        .parents(rowClass)
        .find(targetElementButtonClass, { timeout: DEFAULT_TIMEOUT })
        .should('be.visible')
        .click();
}

