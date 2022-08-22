// Require modules used in the logic below
const { Builder, By, Key, until } = require( 'selenium-webdriver' );
const BankOfAmericaPage = require( './BankOfAmericaPage' );
const WellsFargoPage = require( './WellsFargoPage' );
const CarWashPage = require( './CarWashPage' );

// You can use a remote Selenium Hub, but we are not doing that here
// require( 'chromedriver' );
// const driver = new Builder().forBrowser( 'chrome' ).build();

//to set jasmine default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

// Start to write the first test case
describe( "boa", function () {
    it( "verify page elements", async function () {
        console.log( '<----- Starting to execute test case ----->' );
        let boa = new BankOfAmericaPage();

        //to do login
        await boa.login();

        // console.log( "waiting for Open account button..." );
        // let open_account_button = By.xpath( boa.open_account_button );
        // await this.driver.wait( until.elementLocated( open_account_button ), 30 * 1000 ); 
        // console.log( "open account button found." );


        console.log( "found login link.  clicking..." );
        await boa.click_login();
                
        console.log( 'Login field found and clicked on. locating user id input...' );
        await boa.wait_for_user_id();
        
        console.log( 'User id input found.  entering user id and password...' );
        await boa.enter_user_id();
        await boa.enter_password();
        await boa.click_sign_in();
        await boa.wait_for_balance();

        console.log( 'Balance found. getting balance text...' );
        console.log( await boa.get_balance());
        
        
        boa.driver_quit();
        console.log( '<----- Test case execution completed ----->' );
    } );
} );

describe( "car wash test", function () {
    it( "verify page elements", async function () {
        console.log( '<----- Starting to execute test case ----->' );
        let fcw = new CarWashPage();

        await fcw.openSite();
        console.log( "clicking on phone icon..." );
        await fcw.click_phone();
        console.log( "waiting for chatbox visible..." );
        await fcw.wait_for_chatbox_visible();
        
        fcw.driver_quit();
        console.log( '<----- Test case execution completed ----->' );
    } );
} );


describe( "wells fargo", function () {
    it( "verify page elements", async function () {
        console.log( '<----- Starting to execute  test case ----->' );
        let page = new WellsFargoPage();
        console.log( "waiting for login clickable... ");
        await page.login();
        console.log( "clicking login... " );
        await page.click_login();
        console.log( "entering user id... " );
        await page.enter_user_id();
        console.log( "entering password... " );
        await page.enter_password();
        console.log( "waiting for balance..." );
        await page.wait_for_balance();
        page.driver_quit();
        
    } );
} );