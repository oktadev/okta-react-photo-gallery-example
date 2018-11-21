# Photo Gallery with React, Spring Boot, and JHipster
 
This example app shows how to build a Photo Gallery with [Spring Boot](https://spring.io/projects/spring-boot), [React](https://reactjs.org/), and [JHipster](https://www.jhipster.tech).

Please read [Build a Photo Gallery PWA with React, Spring Boot, and JHipster](https://developer.okta.com/blog/2018/06/25/react-spring-boot-photo-gallery-pwa) to see how this app was created. You can also [watch a screencast on YouTube](https://youtu.be/GlJWUqy1SJM).

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), [Node.js](https://nodejs.org/), and [Yarn](https://yarnpkg.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-react-photo-gallery-example.git photo-gallery
cd photo-gallery
```

This will get a copy of the project installed locally. To install all of its dependencies and start the app, run the commands below.

```
yarn
yarn webpack:build
./mvnw
```

To log in to your app, you'll need to have [Keycloak](https://keycloak.org) up and running. JHipster ships with a Docker container that has the default users and roles. Start Keycloak using the following command.

```
docker-compose -f src/main/docker/keycloak.yml up
```

The security settings in `src/main/resources/config/application.yml` are configured for this image.

```yaml
security:
    basic:
        enabled: false
    oauth2:
        client:
            accessTokenUri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/token
            userAuthorizationUri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/auth
            clientId: web_app
            clientSecret: web_app
            scope: openid profile email
        resource:
            userInfoUri: http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/userinfo
```

### Setup Okta

To use Okta, you'll need to change a few things. First, you'll need to create a free developer account at <https://developer.okta.com/signup/>. After doing so, you'll get your own Okta domain, that has a name like `https://dev-123456.oktapreview.com`.

Modify `src/main/resources/application.yml` to use your Okta settings.

```yaml
security:
    basic:
        enabled: false
    oauth2:
        client:
            accessTokenUri: https://{yourOktaDomain}/oauth2/default/v1/token
            userAuthorizationUri: https://{yourOktaDomain}/oauth2/default/v1/authorize
            clientId: {clientId}
            clientSecret: {clientSecret}
            scope: openid profile email
        resource:
            userInfoUri: https://{yourOktaDomain}/oauth2/default/v1/userinfo
```

Create an OIDC App in Okta to get a `{clientId}` and `{clientSecret}`. To do this, log in to your Okta Developer account and navigate to **Applications** > **Add Application**. Click **Web** and click the **Next** button. Give the app a name you’ll remember, specify `http://localhost:8080` as a Base URI, and `http://localhost:8080/login` as a Login Redirect URI. Click **Done** and copy the client ID and secret into your `application.yml` file.

Create a `ROLE_ADMIN` and `ROLE_USER` group and add users into them. Create a user (e.g., "admin@jhipster.org" with password "Java is hip in 2018!"). Modify e2e tests to use this account when running integration tests. You'll need to change credentials in `src/test/javascript/e2e/account/account.spec.ts` and `src/test/javascript/e2e/admin/administration.spec.ts`.

Navigate to **API** > **Authorization Servers**, click the **Authorization Servers** tab and edit the default one. Click the **Claims** tab and **Add Claim**. Name it "roles", and include it in the ID Token. Set the value type to "Groups" and set the filter to be a Regex of `.*`.

After making these changes, you should be good to go!

## Links

This example uses the following open source libraries:

* [JHipster](https://www.jhipster.tech/)
* [Metadata Extractor](https://github.com/drewnoakes/metadata-extractor)
* [React](https://reactjs.org/)
* [React Photo Gallery](https://github.com/neptunian/react-photo-gallery)
* [Spring Boot](https://spring.io/projects/spring-boot)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2018/06/25/react-spring-boot-photo-gallery-pwa), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if would like to create a support ticket.

This application was generated using JHipster 5.0.1, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v5.0.1](https://www.jhipster.tech/documentation-archive/v5.0.1).

## License

Apache 2.0, see [LICENSE](LICENSE).
