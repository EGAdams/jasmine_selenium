// Require modules used in the logic below
const BankOfAmericaPage = require( './BankOfAmericaPage' );
const WellsFargoPage = require( './WellsFargoPage' );
const CarWashPage = require( './CarWashPage' );




// You can use a remote Selenium Hub, but we are not doing that here
// require( 'chromedriver' );
// const driver = new Builder().forBrowser( 'chrome' ).build();

//to set jasmine default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

// Start to write the first test case
describe( "boa", function () {
    it( "verify page elements", async function () {
        console.log( '<----- Starting to execute test case ----->' );

        let boa = new BankOfAmericaPage( "1002", "https://americansjewelry.com/libraries/local-php-api/index.php/" );
        boa.logObjects = [];
        try {
            //to do login
            await boa.login();

            // boa.logUpdate( "waiting for Open account button..." );
            // let open_account_button = By.xpath( boa.open_account_button );
            // await this.driver.wait( until.elementLocated( open_account_button ), 30 * 1000 ); 
            // boa.logUpdate( "open account button found." );

            
            boa.logUpdate( "found login link.  clicking..." );
            await boa.click_login();
                    
            boa.logUpdate( 'Login field found and clicked on. locating user id input...' );
            await boa.wait_for_user_id();
            
            boa.logUpdate( 'User id input found.  entering user id and password...' );
            await boa.enter_user_id();
            await boa.enter_password();
            await boa.click_sign_in();
            await boa.wait_for_balance();

            boa.logUpdate( 'Balance found. getting balance text...' );
            boa.logUpdate( await boa.get_balance());
            
            boa.driver_quit();
            boa.logUpdate( '<----- Test case execution completed ----->' );
        } catch( e ) {
            boa.logUpdate( `*** ERROR: ${ e.message } ***` );
        }
    } );
} );

// describe( "car wash test", function () {
//     it( "verify page elements", async function () {
//         boa.logUpdate( '<----- Starting to execute test case ----->' );
//         let fcw = new CarWashPage();

//         await fcw.openSite();
//         boa.logUpdate( "clicking on phone icon..." );
//         await fcw.click_phone();
//         boa.logUpdate( "waiting for chatbox visible..." );
//         await fcw.wait_for_chatbox_visible();
        
//         fcw.driver_quit();
//         boa.logUpdate( '<----- Test case execution completed ----->' );
//     } );
// } );


// describe( "wells fargo", function () {
//     it( "verify page elements", async function () {
//         boa.logUpdate( '<----- Starting to execute  test case ----->' );
//         let page = new WellsFargoPage();
//         boa.logUpdate( "waiting for login clickable... ");
//         await page.login();
//         boa.logUpdate( "clicking login... " );
//         await page.click_login();
//         boa.logUpdate( "entering user id... " );
//         await page.enter_user_id();
//         boa.logUpdate( "entering password... " );
//         await page.enter_password();
//         boa.logUpdate( "waiting for balance..." );
//         await page.wait_for_balance();
//         page.driver_quit();
        
//     } );
// } );