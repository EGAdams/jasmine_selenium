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
const baseUrl = 'https://bankofamerica.com'

// function to check for login elements and do login
var boa_login = async function () {

    let login_link = By.xpath( '//select[@id="onlineIdSelect"]' );


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
        await boa_login();
        console.log( "found login link.  clicking..." );

        let xpath_first_login_link = '//a[@id="LOGIN_MEDIUM"]';
        let xpath_user_id = '//input[@id="onlineId1"]';
        let xpath_passcode_one = '//input[@id="passcode1"]';
        let xpath_balance = '//div[@class="AccountBalance"]';
        let sign_in_button = '//button[@id="signIn"]';

        let login_link = By.xpath( xpath_first_login_link );
        await driver.findElement( login_link ).click();

        
        console.log( 'Login field found and clicked on. locating user id input...' );
        
        let userid = By.xpath( xpath_user_id );
        await driver.wait( until.elementLocated( userid ), 30 * 1000 );
        console.log( 'User id input found.  entering user id...' );

        var useridclickable = driver.findElement({ xpath: xpath_user_id });
        // await useridclickable.click();
        await useridclickable.sendKeys( 'bom93778108' );

        var password_clickable = driver.findElement({ xpath: xpath_passcode_one });
        await password_clickable.click();
        await password_clickable.sendKeys( 'dec02@Th' );
        
        console.log( "waiting for sign in button to be clickable..." );
        console.log( "sign in button found.  finding sign in button..." );
        var sign_on = driver.findElement({ xpath: sign_in_button });
        console.log( "clicking sign_on button..." ); 
        await sign_on.click();

        let balance_span = By.xpath( xpath_balance );
        console.log( "waiting for balance to be clickable..." );
        await driver.wait( until.elementLocated( balance_span ), 30 * 1000 );
        console.log( 'Balance found. getting balance text...' );
        console.log( await driver.findElement({ xpath: xpath_balance }).getText());
        


        //verify welcome message on login page
        //expect( await driver.findElement( welcomeMessage ).getText() ).toBe( 'Log in' );

        //to quit the web driver at end of test case execution
        await driver.quit();

        console.log( '<----- Test case execution completed ----->' );
    } );
} );