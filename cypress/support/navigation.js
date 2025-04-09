// cypress/support/navigation.js
import {BASE_URL, DELAYS, PAGE_TITLES} from '../constants/projectConstants'

export function visitOrangeHRMApplication() {
    cy.visit(BASE_URL);
  }
  