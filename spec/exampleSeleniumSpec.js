// Require modules used in the logic below
const {
    Builder,
    By,
    Key,
    until
} = require( 'selenium-webdriver' );

// You can use a remote Selenium Hub, but we are not doing that here
require( 'chromedriver' );
const driver = new Builder()
    .forBrowser( 'chrome' )
    .build();

// Setting variables for our testcase
const baseUrl = 'https://wellsfargo.com'

// function to check for login elements and do login
var wf_login = async function () {

    let login_link = By.xpath( '//a[@class="ps-sign-on-text"]' );


    // navigate to the login page
    await driver.get( baseUrl );

    // wait for login page to be loaded
    await driver.wait( until.elementLocated( login_link ), 30 * 1000 );
    console.log( 'Login screen loaded.' )
}

//to set jasmine default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

// Start to write the first test case
describe( "Selenium test case for login page", function () {
    it( "verify page elements", async function () {
        console.log( '<----- Starting to execute test case ----->' );

        //to do login
        await wf_login();
        console.log( "found login link.  clicking..." );

        let login_link = By.xpath( '//a[@class="ps-sign-on-text"]' );
        await driver.findElement( login_link ).click();

        let userid = By.xpath( '//input[@id="j_username"]' );
        await driver.wait( until.elementLocated( userid ), 30 * 1000 );

        console.log( 'Userid field found.' );

        var useridclickable = driver.findElement({ xpath: '//input[@id="j_username"]' });
        await useridclickable.click();
        await useridclickable.sendKeys( 'lxa12pf' );

        var password_clickable = driver.findElement({ xpath: '//input[@id="j_password"]' });
        await password_clickable.click();
        await password_clickable.sendKeys( 'jun02@Th' );
        
        var sign_on = driver.findElement({ xpath: '//button[contains(text(), "Sign on")]' });
        await sign_on.click();

        let account_id = By.xpath( '//input[@id="acc-dcb4135f-5c78-4c4e-b1e7-67486a137cbe-balance"]' );
        await driver.wait( until.elementLocated( account_id ), 30 * 1000 );



        //verify welcome message on login page
        //expect( await driver.findElement( welcomeMessage ).getText() ).toBe( 'Log in' );

        //to quit the web driver at end of test case execution
        await driver.quit();

        console.log( '<----- Test case execution completed ----->' );
    } );
} );