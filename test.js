

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
let BankOfAmericaPage = require( './spec/BankOfAmericaPage' );

// var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    let boa = new BankOfAmericaPage( "1002", "https://americansjewelry.com/libraries/local-php-api/index.php/" );
    boa.logObjects = [];
    try {
        //to do login
        boa.login();
        // boa.logUpdate( "waiting for Open account button..." );
        // let open_account_button = By.xpath( boa.open_account_button );
        // await this.driver.wait( until.elementLocated( open_account_button ), 30 * 1000 ); 
        // boa.logUpdate( "open account button found." );

        
        // boa.logUpdate( "found login link.  clicking..." );
        // await boa.click_login();
                
        // boa.logUpdate( 'Login field found and clicked on. locating user id input...' );
        // await boa.wait_for_user_id();
        
        // boa.logUpdate( 'User id input found.  entering user id and password...' );
        // await boa.enter_user_id();
        // await boa.enter_password();
        // await boa.click_sign_in();
        // console.log( "start to wait for balance..." );           
        // await boa.wait_for_balance();
        // console.log( "done waiting for balance." );
        // boa.logUpdate( 'Balance found. getting balance text...' );
        // console.log( "calling await boa.get_balance()..." );
        // let bal = await boa.get_balance();
        // console.log( "done.  calling logUpdate with balance: " + bal + "..." );
        // boa.logUpdate( "got balance." );
        // boa.logUpdate( bal );
        // console.log( "done.  calling logOut..." );
        // await boa.logOut( bal );
        // console.log( "done.  calling driver_quit()..." );
        // await boa.driver_quit();
        // console.log( '<----- Test case execution completed ----->' );
    } catch( e ) {
        console.log( `*** ERROR: ${ e.message } ***` )
        boa.logUpdate( `ERROR ${ e.message }` );
    }
