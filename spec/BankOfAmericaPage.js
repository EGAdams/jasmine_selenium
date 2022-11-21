//** @class BandOfAmericaPage */
const { Builder, By, Key, until } = require( 'selenium-webdriver'  );
const { MonitoredObject }         = require( 'monitored-object-ts' );
// const { Options }                 = require( 'selenium-webdriver/chrome' );
class BankOfAmericaPage extends MonitoredObject {
    constructor( new_id_arg, data_source_location_arg ) {
        super({ new_id: new_id_arg, data_source_location: data_source_location_arg });
        // Setting variables for our testcase
        this.baseUrl = 'https://www.bankofamerica.com'              // base url
        
        // const options = new Options();
        // options.addArguments('--headless');
        // options.addArguments('--no-sandbox');
        // options.addArguments('--disable-dev-shm-usage');
        // options.addArguments("--disable-gpu");
        // options.addArguments( "--disable-setuid-sandbox" );
        
        // options.setChromeBinaryPath( " C:\\Users\\EG" );
        // require( 'chromedriver' );                                  // require and build driver...
        this.driver = new Builder().forBrowser( 'chrome' )/*.setChromeOptions( options )*/.build(); }

    async login() {
        let login_link = By.xpath( '//select[@id="onlineIdSelect"]' );
        this.logUpdate( "getting this.baseUrl..." );
        await this.driver.get( this.baseUrl );
        this.logUpdate( "waiting for select[@id=onlineIdSelect] to be elementLocated..." );
        await this.driver.wait( until.elementLocated( login_link ), 30 * 1000 );
        this.logUpdate( 'Login screen loaded.' ); }

    
    async click_login() {
        let login_link = By.xpath( '//a[@id="LOGIN_MEDIUM"]' );
        await this.driver.findElement( login_link ).click(); }

    async wait_for_user_id() {
        this.logUpdate( "waiting setting target to id onlineId1..." );
        let xpath_user_id = '//input[@id="onlineId1"]'; // oid ??
        this.logUpdate( "waiting for user id to be clickable inside boa object..." );
        let userid = By.xpath( xpath_user_id );
        this.logUpdate( "awaiting driver wait..." );
        await this.driver.wait( until.elementLocated( userid ), 30 * 1000 ); 
        this.logUpdate( "user id found in boa object..." ); }

    async enter_user_id() {
        let xpath_user_id = '//input[@id="onlineId1"]';
        this.logUpdate( "finding user id with xpath: id = onlineId1..." );
        let useridclickable = this.driver.findElement({ xpath: xpath_user_id });
        this.logUpdate ("clicking user id..." );
        await useridclickable.click();
        this.logUpdate ("sending the needed info..." );
        await useridclickable.sendKeys( 'bom93778108' ); }

    async enter_password() {
        let password_clickable = this.driver.findElement({ xpath: '//input[@id="passcode1"]' });
        await password_clickable.click();
        await password_clickable.sendKeys( process.argv[ 4 ] ); }

    async click_sign_in() {
        this.logUpdate( "finding sign in button..." );
        let sign_on = this.driver.findElement({ xpath: '//button[@id="signIn"]' });
        this.logUpdate( "clicking sign_on button..." ); 
        await sign_on.click(); }
    
    async wait_for_balance() {
        let balance_span = By.xpath( '//div[@class="balanceValue"]' );
        this.logUpdate( "waiting for balance to be clickable..." );
        await this.driver.wait( until.elementLocated( balance_span ), 30 * 1000 ); }

    async get_balance() {
        this.logUpdate( "finding element with class AccountBalance... " );
        return this.driver.findElement({ xpath: '//div[@class="balanceValue"]' }).getText(); }

    async driver_quit() { await this.driver.quit(); }    
}

module.exports = BankOfAmericaPage;