/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import TagComponentsPage from './tag.page-object';
import TagUpdatePage from './tag-update.page-object';

const expect = chai.expect;

describe('Tag e2e test', () => {
  let navBarPage: NavBarPage;
  let tagUpdatePage: TagUpdatePage;
  let tagComponentsPage: TagComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.getSignInPage();
  });

  it('should load Tags', async () => {
    navBarPage.getEntityPage('tag');
    tagComponentsPage = new TagComponentsPage();
    expect(await tagComponentsPage.getTitle().getText()).to.match(/Tags/);
  });

  it('should load create Tag page', async () => {
    tagComponentsPage.clickOnCreateButton();
    tagUpdatePage = new TagUpdatePage();
    expect(await tagUpdatePage.getPageTitle().getAttribute('id')).to.match(/galleryApp.tag.home.createOrEditLabel/);
  });

  it('should create and save Tags', async () => {
    tagUpdatePage.setNameInput('name');
    expect(await tagUpdatePage.getNameInput()).to.match(/name/);
    await tagUpdatePage.save();
    expect(await tagUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
