import { element, by, ElementFinder } from 'protractor';

export default class PhotoUpdatePage {
  pageTitle: ElementFinder = element(by.id('galleryApp.photo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#photo-title'));
  descriptionInput: ElementFinder = element(by.css('input#photo-description'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  takenOnInput: ElementFinder = element(by.css('input#photo-takenOn'));
  uploadedOnInput: ElementFinder = element(by.css('input#photo-uploadedOn'));
  albumSelect: ElementFinder = element(by.css('select#photo-album'));
  tagSelect: ElementFinder = element(by.css('select#photo-tag'));

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

  setImageInput(image) {
    this.imageInput.sendKeys(image);
  }

  getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  setTakenOnInput(takenOn) {
    this.takenOnInput.sendKeys(takenOn);
  }

  getTakenOnInput() {
    return this.takenOnInput.getAttribute('value');
  }

  setUploadedOnInput(uploadedOn) {
    this.uploadedOnInput.sendKeys(uploadedOn);
  }

  getUploadedOnInput() {
    return this.uploadedOnInput.getAttribute('value');
  }

  albumSelectLastOption() {
    this.albumSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  albumSelectOption(option) {
    this.albumSelect.sendKeys(option);
  }

  getAlbumSelect() {
    return this.albumSelect;
  }

  getAlbumSelectedOption() {
    return this.albumSelect.element(by.css('option:checked')).getText();
  }

  tagSelectLastOption() {
    this.tagSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  tagSelectOption(option) {
    this.tagSelect.sendKeys(option);
  }

  getTagSelect() {
    return this.tagSelect;
  }

  getTagSelectedOption() {
    return this.tagSelect.element(by.css('option:checked')).getText();
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
