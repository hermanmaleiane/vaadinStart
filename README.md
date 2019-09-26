
# App Starter for Vaadin Flow

This is a Vaadin platform example application created with Java and HTML. It is used to demonstrate features of Vaadin platform.

T
## Dependencies

Dependencies are managed by Vaadin platform and `vaadin-maven-plugin`.

## Running the Project in Developer Mode

1. Run `mvn jetty:run`
2. Wait for the application to start
3. Open http://localhost:8080/ to view the application

Note that there are some files/folders generated in the project structure automatically. You can find some information about them [here](https://vaadin.com/docs/v14/flow/v14-migration/v14-migration-guide.html#6-build-and-maintain-the-v14-project).

## Production Mode

1. Run `mvn package -Pproduction` to get the artifact.
2. Deploy the `target/beveragebuddy-2.0-SNAPSHOT.war`.

If you want to run the production build using the Jetty plugin, use `mvn jetty:run -Pproduction` and navigate to the http://localhost:8080/.

## Documentation

Brief introduction to the application parts can be found from the `documentation` folder. For Vaadin documentation for Java users, see [Vaadin.com/docs](https://vaadin.com/docs/flow/Overview.html).

## Adding new templates

To add a new template or a style to the project create the JavaScript module in the `./frontend` directory.

Then in the PolymerTemplate using the P3 element add the `JsModule` annotation e.g. `@JsModule("./src/views/reviewslist/reviews-list.js")`

### Branching information
* `master` the latest version of the starter, using the latest platform version
* `v10` the version for Vaadin Platform 10
* `v11` the version for Vaadin Platform 11
* `v12` the version for Vaadin Platform 12
* `v13` the version for Vaadin Platform 13

