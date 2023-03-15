const config = require('../config.json')

class RadarPage {
  constructor() {
    this.blip = '.quadrant-group-second .blip-link:nth-of-type(1)'
    this.allBlips = '.blip-link'
    this.bannerTitle = '.hero-banner__title-text'
    this.graphTitle = '.hero-banner__subtitle-text'
    this.quadrantList = '.quadrant-subnav__list-item'
    this.quadrantDropdown = '.quadrant-subnav__dropdown'
    this.quadrantSelector = '.quadrant-subnav__dropdown-selector'
    this.platformsSubnavItem = '.quadrant-subnav__list-item:nth-child(3)'
    this.searchBox = '.search-container__input'
    this.searchResultItems = '.ui-menu-item'
    this.alternateRadarsItems = '.alternative-radars__list-item'
    this.blipSelectedOld = '.quadrant-table.selected .blip-list-item.highlight'
    this.blipDescriptionOld = '.blip-item-description.expanded p'
    this.blipDescription = '.blip-list__item-container.expand .blip-list__item-container__description'
    this.autocomplete = '.search-radar'
    this.searchValue = 'Component'
    this.searchItem = '.ui-menu-item:first'
    this.quadrant = '#second-quadrant-mobile'
    this.firstQuadrant = '.quadrant-group-first'
    this.quadrantTableRings = '.quadrant-table.selected .quadrant-table__ring-name'
    this.quadrantTableBlips = '.quadrant-table.selected .blip-list__item'
    this.subnavDropdown = '.quadrant-subnav__dropdown'
    this.subnavList = '.quadrant-subnav__list'
    this.radarGraphSvg = 'svg#radar-plot'
    this.mobileQuadrants = '.all-quadrants-mobile'
    this.quadrantTableBlip = function (blipId) {
      return `.quadrant-table.selected .blip-list__item .blip-list__item-container[data-blip-id="${blipId}"]`
    }
    this.quadrantTableBlipDescription = function (blipId) {
      return `.quadrant-table.selected .blip-list__item .blip-list__item-container[data-blip-id="${blipId}"] #blip-description-${blipId}`
    }
    this.radarGraphBlip = function (blipId) {
      return `a.blip-link[data-blip-id="${blipId}"]`
    }
    this.subnavQuadrant = function (quadrantName) {
      return `.quadrant-subnav__list-item#subnav-item-${quadrantName}`
    }
    this.quadrantGraph = function (quadrantOrder) {
      return `.quadrant-group-${quadrantOrder}`
    }
    this.quadrantGraphTablet = function (quadrantOrder) {
      return `#${quadrantOrder}-quadrant-mobile`
    }
    this.searchResultByIndex = function (index) {
      return `.ui-menu-item:nth-child(${index})`
    }
    this.alternateRadarsItemByIndex = function (index) {
      return `.alternative-radars__list-item:nth-child(${index})`
    }
  }

  clickTheBlipInFullRadarView() {
    cy.get(this.blip).click()
  }

  clickTheBlip() {
    cy.get(this.blipSelectedOld).click()
  }

  clickQuadrantInFullRadarView(quadrantOrder) {
    cy.get(this.quadrantGraph(quadrantOrder)).click()
  }

  clickQuadrantInFullRadarViewTablet(quadrantOrder) {
    cy.get(this.quadrantGraphTablet(quadrantOrder)).click()
  }

  clickBlipItemInQuadrantTable(blipId) {
    cy.get(this.quadrantTableBlip(blipId)).click()
  }

  clickBlipInRadarGraph(blipId) {
    cy.get(this.radarGraphBlip(blipId)).click()
  }

  clickQuadrantInSubnav(quadrantName) {
    cy.get(this.subnavQuadrant(quadrantName)).click()
  }

  clickSubnavDropdownTablet() {
    cy.get(this.subnavDropdown).click()
  }

  clickSearchResult(index) {
    cy.get(this.searchResultByIndex(index)).click()
  }

  clickAlternateRadarItem(index) {
    cy.get(this.alternateRadarsItemByIndex(index)).click()
  }

  searchTheBlip() {
    cy.get(this.autocomplete).type(this.searchValue)
    cy.get(this.searchItem).click()
  }

  triggerSearch(query) {
    cy.get(this.searchBox).clear()
    cy.get(this.searchBox).type(query)
  }

  validateBlipDescription(text) {
    cy.get(this.blipDescription).contains(text)
  }

  validateBlipDescriptionOld(text) {
    cy.get(this.blipDescriptionOld).contains(text)
  }

  validateBlipSearch() {
    cy.get(this.blipSelectedOld).contains(this.searchValue)
  }

  validateBlipCountForPublicGoogleSheet() {
    cy.get(this.allBlips).should('have.length', 103)
  }

  validateGraphTitle(title) {
    cy.get(this.graphTitle).should('have.text', title)
  }

  validateQuadrantNames() {
    cy.get(this.quadrantList).should('have.length', 5)

    let i = 1
    for (const quadrant of config.QUADRANT_NAMES) {
      cy.get(`${this.quadrantList}:nth-child(${i})`).should('have.text', quadrant)
      i++
    }
  }

  validateQuadrantNamesForPublicGoogleSheet() {
    cy.get(this.quadrantList).should('have.length', 5)

    let i = 1
    for (const quadrant of config.QUADRANT_NAMES) {
      cy.get(`${this.quadrantList}:nth-child(${i})`).should('have.text', quadrant)
      i++
    }
  }

  validateSearchResults(query, results) {
    this.triggerSearch(query)
    cy.get(this.searchResultItems).should('have.length', results)
  }

  validateAlternateRadarsForPublicGoogleSheet() {
    cy.get(this.alternateRadarsItems).should('have.length', 2)

    let i = 1
    for (const name of config.PUBLIC_GOOGLE_SHEET_RADAR_SHEET_NAMES) {
      cy.get(`${this.alternateRadarsItems}:nth-child(${i})`).should('have.text', name)
      i++
    }
  }

  validateQuadrantSubnavClick(name) {
    cy.get(this.quadrantDropdown).click()
    cy.get(this.platformsSubnavItem).click()
    cy.get(this.quadrantSelector).should('have.text', name)
  }

  validateRingsInQuadrantTable(count) {
    cy.get(this.quadrantTableRings).should('have.length', count)
  }

  validateBlipsInQuadrantTable(count) {
    cy.get(this.quadrantTableBlips).should('have.length', count)
  }

  validateBlipDescriptionVibisbleInQuadrantTable(blipId) {
    cy.get(this.quadrantTableBlip(blipId)).should('have.class', 'expand')
    cy.get(this.quadrantTableBlipDescription(blipId)).should('be.visible')
  }

  validateBlipDescriptionHiddenInQuadrantTable(blipId) {
    cy.get(this.quadrantTableBlip(blipId)).should('not.have.class', 'expand')
    cy.get(this.quadrantTableBlipDescription(blipId)).should('be.hidden')
  }

  validateQuadrantGraphVisible(quadrantOrder) {
    cy.get(this.quadrantGraph(quadrantOrder)).should('be.visible')
  }

  validateQuadrantGraphHidden(quadrantOrder) {
    cy.get(this.quadrantGraph(quadrantOrder)).should('be.hidden')
  }

  validateActiveQuadrantInSubnav(quadrantName) {
    cy.get(this.subnavQuadrant(quadrantName)).should('have.class', 'active-item')
  }

  validateSubnavDropdownVisibleTablet() {
    cy.get(this.subnavList).should('be.visible')
  }

  validateSubnavDropdownHiddenTablet() {
    cy.get(this.subnavList).should('be.hidden')
  }

  validateActiveAlternateRadar(index) {
    cy.get(this.alternateRadarsItemByIndex(index)).should('have.class', 'active')
  }

  validateInactiveAlternateRadar(index) {
    cy.get(this.alternateRadarsItemByIndex(index)).should('not.have.class', 'active')
  }

  validateMobileQuadrantsVisible() {
    cy.get(this.mobileQuadrants).should('be.visible')
  }

  validateMobileQuadrantsHidden() {
    cy.get(this.mobileQuadrants).should('be.hidden')
  }

  validateGraphVisible() {
    cy.get(this.radarGraphSvg).should('be.visible')
  }

  validateGraphHidden() {
    cy.get(this.radarGraphSvg).should('be.hidden')
  }

  resetRadarView() {
    cy.get(this.bannerTitle).click()
  }

  validateQuadrantOrder() {
    cy.get('.quadrant-group.quadrant-group-first .quadrant-name-group').should('have.text', config.QUADRANT_NAMES[1])
    cy.get('.quadrant-group.quadrant-group-second .quadrant-name-group').should('have.text', config.QUADRANT_NAMES[2])
    cy.get('.quadrant-group.quadrant-group-third .quadrant-name-group').should('have.text', config.QUADRANT_NAMES[3])
    cy.get('.quadrant-group.quadrant-group-fourth .quadrant-name-group').should('have.text', config.QUADRANT_NAMES[4])
  }

  validateRingOrder() {
    cy.get('.quadrant-group-first .line-text:nth-of-type(1)').should('have.text', 'Adopt')
    cy.get('.quadrant-group-first .line-text:nth-of-type(2)').should('have.text', 'Trial')
    cy.get('.quadrant-group-first .line-text:nth-of-type(3)').should('have.text', 'Assess')
    cy.get('.quadrant-group-first .line-text:nth-of-type(4)').should('have.text', 'Hold')
  }
}

module.exports = new RadarPage()
