//** @class BandOfAmericaPage */
const { Builder, By, Key, until } = require( 'selenium-webdriver' );
const { MonitoredObject } = require( 'monitored-object-ts' );
var chrome = require( 'selenium-webdriver/chrome' );
var path = require( 'chromedriver' ).path;
// const { Options }                 = require( 'selenium-webdriver/chrome' );
class BankOfAmericaPage extends MonitoredObject {
    constructor( new_id_arg, data_source_location_arg ) {
        super( { new_id: new_id_arg, data_source_location: data_source_location_arg } );
        // Setting variables for our testcase
        this.baseUrl = 'https://www.bankofamerica.com'; // base url

        // const options = new Options();
        // options.addArguments('--headless');
        // options.addArguments('--no-sandbox');
        // options.addArguments('--disable-dev-shm-usage');
        // options.addArguments("--disable-gpu");
        // options.addArguments( "--disable-setuid-sandbox" );

        // options.setChromeBinaryPath( " C:\\Users\\EG" );
        // require( 'chromedriver' );                                  // require and build driver...
        //this.driver = new Builder().forBrowser( 'chrome' )/*.setChromeOptions( options )*/.build(); 
        this.driver = new Builder().forBrowser( "chrome" ).build();
    }

    async login () {

        let login_link     = By.xpath( '//select[@id="onlineIdSelect"]' );
        let alt_login_link = By.xpath( '//a[@id="LOGIN_MEDIUM"]'        );
        let login_small    = By.xpath( '//a[@id="LOGIN_SMALL"]'         );

        this.logUpdate( "getting this.baseUrl..." );
        
        this.logUpdate( "waiting for select onlineIdSelect to be elementLocated..." );
        console.log( "waiting for:" + login_link + ", " + alt_login_link + ", " + "and " + login_small + "..." );
         
        
        
        // async function startTest( the_driver, the_base_url ) {
        //     await the_driver.get( the_base_url );
        //     let firstLocatedElement = await Promise.race([       // thanks chatgpt .. maybe...
        //         // this.driver.wait( until.elementLocated( login_link     /* By.id( 'element1' ) */ ), 10 * 1000 ),
        //         // this.driver.wait( until.elementLocated( alt_login_link /* By.id( 'element2' ) */ ), 10 * 1000 ),
        //         // this.driver.wait( until.elementLocated( login_small    /* By.id( 'element3' ) */ ), 10 * 1000 )])
        //         the_driver.findElement( By.id( "onlineIdSelect"     /* By.id( 'element1' ) */ ), 10 * 1000 ),
        //         the_driver.findElement( By.id( "LOGIN_MEDIUM" /* By.id( 'element2' ) */ ), 10 * 1000 ),
        //         the_driver.findElement( By.id( "LOGIN_SMALL"  /* By.id( 'element3' ) */ ), 10 * 1000 )])
        //     .then( async function( firstLocatedElement ) {
        //         console.log( "then called..." );
        //         await firstLocatedElement.click();
        //         console.log( "result: [" + firstLocatedElement.getText() + "]" );
        //     })
        //     .catch( function( the_error ) {
        //         console.log( "the_error: " + the_error );
        //     });
        // };

        async function startTest( the_driver, the_url) {
            let driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get( the_url );
                let element1Promise = the_driver.wait(until.elementLocated(By.id("onlineIdSelect")), 30000);
                // let element2Promise = the_driver.wait(until.elementLocated(By.id("LOGIN_SMALL")), 35000);
                // let element3Promise = the_driver.wait(until.elementLocated(By.id("LOGIN_MEDIUM")), 40000);
                let firstLocatedElement = await Promise.race([element1Promise /*, element2Promise, element3Promise */]);
                await firstLocatedElement.click();
            } finally {
                await the_driver.quit();
            }
        }
        

        startTest( this.driver, this.baseUrl );
        
        // let login_element = await this.driver.wait( until.elementLocated( login_link ), 10 * 1000 );
        // let alt_login_element = await this.driver.wait( until.elementLocated( alt_login_link ), 10 * 1000 );
        // console.log( "login_element: "     + login_element.getText());
        // console.log( "alt_login_element: " + alt_login_element.getText());

        this.logUpdate( 'Login screen loaded.' );
        // to close the browser
        //await this.driver.quit();
    }


    async click_login () {
        let login_link = By.xpath( '//a[@id="LOGIN_MEDIUM"]' );
        await this.driver.findElement( login_link ).click();
    }

    async wait_for_user_id () {
        this.logUpdate( "waiting setting target to id onlineId1..." );
        let xpath_user_id = '//input[@id="onlineId1"]'; // oid ??
        this.logUpdate( "waiting for user id to be clickable inside boa object..." );
        let userid = By.xpath( xpath_user_id );
        this.logUpdate( "awaiting driver wait..." );
        await this.driver.wait( until.elementLocated( userid ), 30 * 1000 );
        this.logUpdate( "user id found in boa object..." );
    }

    async enter_user_id () {
        let xpath_user_id = '//input[@id="onlineId1"]';
        this.logUpdate( "finding user id with xpath: id = onlineId1..." );
        let useridclickable = this.driver.findElement( { xpath: xpath_user_id } );
        this.logUpdate( "clicking user id..." );
        await useridclickable.click();
        this.logUpdate( "sending the needed info..." );
        await useridclickable.sendKeys( 'bom93778108' );
    }

    async enter_password () {
        let password_clickable = this.driver.findElement( { xpath: '//input[@id="passcode1"]' } );
        await password_clickable.click();
        await password_clickable.sendKeys( process.argv[ 4 ] );
    }

    async click_sign_in () {
        this.logUpdate( "finding sign in button..." );
        let sign_on = this.driver.findElement( { xpath: '//button[@id="signIn"]' } );
        this.logUpdate( "clicking sign_on button..." );
        await sign_on.click();
    }

    async logOut ( balance ) {
        this.logUpdate( "got balance of: " + balance + "  logging out of boa..." );
        let log_out = this.driver.findElement( { xpath: '//a[@class="olb-sign-out"]' } );
        await log_out.click();
    }

    async wait_for_balance () {
        // let balance_span = By.xpath( '//div[@class="AccountBalance"]' );
        // let balance_span = this.driver.findElement({ xpath: '//div[@class="AccountBalance"]' });
        let balance_span = By.xpath( '//div[@class="AccountBalance"]' );
        this.logUpdate( "waiting for balance to be clickable..." );
        console.log( "looking for class = balanceValue..." );
        await this.driver.wait( until.elementLocated( balance_span ), 30 * 1000 );
    }

    async get_balance () {
        console.log( "finding element with class AccountBalance... " );
        this.logUpdate( "finding element with class AccountBalance... " );
        // let successful_info = this.driver.findElement({ xpath: '//div[@class="AccountBalance"]' }).getText(); 
        let theScrapedAccountBalance = By.xpath( '//div[@class="AccountBalance"]' );
        await this.driver.wait( until.elementLocated( theScrapedAccountBalance ), 30 * 1000 );
        console.log( "found element.  calling getText() on that returned object..." );
        let successful_info = this.driver.findElement( { xpath: '//div[@class="AccountBalance"]' } ).getText();
        console.log( "successful_info: [" + successful_info + "]" );
        return successful_info;
    }

    async driver_quit () {
        console.log( "awaiting driver quit... " );
        await this.driver.quit();
    }
}

module.exports = BankOfAmericaPage;