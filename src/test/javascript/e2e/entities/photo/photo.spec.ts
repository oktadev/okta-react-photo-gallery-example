/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import PhotoComponentsPage from './photo.page-object';
import PhotoUpdatePage from './photo-update.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Photo e2e test', () => {
  let navBarPage: NavBarPage;
  let photoUpdatePage: PhotoUpdatePage;
  let photoComponentsPage: PhotoComponentsPage;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.getSignInPage();
  });

  it('should load Photos', async () => {
    navBarPage.getEntityPage('photo');
    photoComponentsPage = new PhotoComponentsPage();
    expect(await photoComponentsPage.getTitle().getText()).to.match(/Photos/);
  });

  it('should load create Photo page', async () => {
    photoComponentsPage.clickOnCreateButton();
    photoUpdatePage = new PhotoUpdatePage();
    expect(await photoUpdatePage.getPageTitle().getAttribute('id')).to.match(/galleryApp.photo.home.createOrEditLabel/);
  });

  it('should create and save Photos', async () => {
    photoUpdatePage.setTitleInput('title');
    expect(await photoUpdatePage.getTitleInput()).to.match(/title/);
    photoUpdatePage.setDescriptionInput('description');
    expect(await photoUpdatePage.getDescriptionInput()).to.match(/description/);
    photoUpdatePage.setImageInput(absolutePath);
    photoUpdatePage.setTakenOnInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await photoUpdatePage.getTakenOnInput()).to.contain('2001-01-01T02:30');
    photoUpdatePage.setUploadedOnInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await photoUpdatePage.getUploadedOnInput()).to.contain('2001-01-01T02:30');
    photoUpdatePage.albumSelectLastOption();
    // photoUpdatePage.tagSelectLastOption();
    await photoUpdatePage.save();
    expect(await photoUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
