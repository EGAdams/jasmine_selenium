// Require modules used in the logic below
const { Builder, By, Key, until } = require( 'selenium-webdriver' );

// You can use a remote Selenium Hub, but we are not doing that here
require( 'chromedriver' );
const driver = new Builder()
    .forBrowser( 'chrome' )
    .build();

// Setting variables for our testcase
const baseUrl = 'http://floridascarwash.com'

// function to check for login elements and do login
var loginToLamdbatest = async function () {

    let loginButton = By.xpath( '//a[@id="login_link"]' );

    // navigate to the login page
    await driver.get( baseUrl );

    // wait for login page to be loaded
    await driver.wait( until.elementLocated( loginButton ), 30 * 1000 );
    console.log( 'Login screen loaded.' )
}

//to set jasmine default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000;

// Start to write the first test case
describe( "Selenium test case for login page", function () {
    it( "verify page elements", async function () {
        console.log( '<----- Starting to execute test case ----->' );

        //to do login
        await loginToLamdbatest();

        var welcomeMessage = By.xpath( '//*[@id="login_link"]' );

        //verify welcome message on login page
        expect( await driver.findElement( welcomeMessage ).getText() ).toBe( 'Log in' );

        //to quit the web driver at end of test case execution
        await driver.quit();

        console.log( '<----- Test case execution completed ----->' );
    } );
} );
