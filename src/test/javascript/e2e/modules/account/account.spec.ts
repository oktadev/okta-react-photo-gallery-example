/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import SignInPage from '../../page-objects/signin-page';
import NavBarPage from '../../page-objects/navbar-page';
import { waitUntilDisplayed } from '../../util/utils';

const expect = chai.expect;

describe('Account', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  const loginPageTitle = 'login-title';

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage(true);
    signInPage = navBarPage.getSignInPage();
  });

  it('should fail to login with bad password', async () => {
    signInPage.loginWithOAuth('admin', 'foo');
    const alert = element(by.css('.alert-error'));
    if (await alert.isPresent()) {
      // Keycloak
      expect(await alert.getText()).to.eq('Invalid username or password.');
    } else {
      // Okta
      const error = element(by.css('.infobox-error'));
      waitUntilDisplayed(error);
      expect(await error.getText()).to.eq('Sign in failed!');
    }
    await signInPage.clearUserName();
    await signInPage.clearPassword();
  });

  it('should login with admin account', async () => {
    browser.get('/');
    signInPage = navBarPage.getSignInPage();
    // Keycloak credentials by default, change them to be able to use oauth2 with Okta
    signInPage.loginWithOAuth('admin', 'admin');
    const success = element(by.className('alert-success'));
    waitUntilDisplayed(success);
    // Success alert should appear in home page
    expect(await success.isPresent()).to.be.true;
  });
});
