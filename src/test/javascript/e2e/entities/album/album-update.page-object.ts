import { element, by, ElementFinder } from 'protractor';

export default class AlbumUpdatePage {
  pageTitle: ElementFinder = element(by.id('galleryApp.album.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#album-title'));
  descriptionInput: ElementFinder = element(by.css('input#album-description'));
  createdInput: ElementFinder = element(by.css('input#album-created'));
  userSelect: ElementFinder = element(by.css('select#album-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  setTitleInput(title) {
    this.titleInput.sendKeys(title);
  }

  getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  setDescriptionInput(description) {
    this.descriptionInput.sendKeys(description);
  }

  getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  setCreatedInput(created) {
    this.createdInput.sendKeys(created);
  }

  getCreatedInput() {
    return this.createdInput.getAttribute('value');
  }

  userSelectLastOption() {
    this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  userSelectOption(option) {
    this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
