//** @class BandOfAmericaPage */
const { Builder, By, Key, until } = require( 'selenium-webdriver'  );
const { MonitoredObject }         = require( 'monitored-object-ts' );
class BankOfAmericaPage extends MonitoredObject {
    constructor( new_id_arg, data_source_location_arg ) {
        super({ new_id: new_id_arg, data_source_location: data_source_location_arg });
        // Setting variables for our testcase
        this.baseUrl = 'https://www.bankofamerica.com'              // base url
        this.xpath_first_login_link = '//a[@id="LOGIN_MEDIUM"]';    // login link
        this.xpath_user_id = '//input[@id="onlineId1"]';            // user id input
        this.xpath_user_id_2 = '//input[@class="spa-input-text"]';  // user id input 2
        this.xpath_passcode_one = '//input[@id="passcode1"]';       // password input
        this.xpath_balance = '//div[@class="AccountBalance"]';      // balance text
        this.sign_in_button = '//button[@id="signIn"]';             // sign in button
        this.open_account_button = '//span[@class="spa-btn"]';      // open account button
        require( 'chromedriver' );                                  // require and build driver...
        this.driver = new Builder().forBrowser( 'chrome' ).build(); }

    async login() {
        let login_link = By.xpath( '//select[@id="onlineIdSelect"]' );
        console.log( "getting this.baseUrl..." );
        await this.driver.get( this.baseUrl );
        console.log( "waiting for \"//select[@id=\"onlineIdSelect\"]\" to be elementLocated..." );
        await this.driver.wait( until.elementLocated( login_link ), 30 * 1000 );
        console.log( 'Login screen loaded.' ); }

    
    

    async click_login() {
        let login_link = By.xpath( this.xpath_first_login_link );
        await this.driver.findElement( login_link ).click(); }

    async wait_for_user_id() {
        console.log( "waiting for user id to be clickable inside boa object..." );
        let userid = By.xpath( this.xpath_user_id );
        await this.driver.wait( until.elementLocated( userid ), 30 * 1000 ); 
        console.log( "user id found in boa object..." ); }

    async enter_user_id() {
        console.log( "finding user id with xpath: " + this.xpath_user_id + " ..." );
        let useridclickable = this.driver.findElement({ xpath: this.xpath_user_id });
        console.log ("clicking user id: " + useridclickable + " ..." );
        await useridclickable.click();
        console.log ("sending keys bom93778108..." );
        await useridclickable.sendKeys( 'bom93778108' ); }

    async enter_password() {
        let password_clickable = this.driver.findElement({ xpath: this.xpath_passcode_one });
        await password_clickable.click();
        await password_clickable.sendKeys( 'dec02@Th' ); }

    async click_sign_in() {
        console.log( "finding sign in button..." );
        let sign_on = this.driver.findElement({ xpath: this.sign_in_button });
        console.log( "clicking sign_on button..." ); 
        await sign_on.click(); }
    
    async wait_for_balance() {
        let balance_span = By.xpath( this.xpath_balance );
        console.log( "waiting for balance to be clickable..." );
        await this.driver.wait( until.elementLocated( balance_span ), 30 * 1000 ); }

    async get_balance() {
        return this.driver.findElement({ xpath: this.xpath_balance }).getText(); }

    async driver_quit() { await this.driver.quit(); }    
}

module.exports = BankOfAmericaPage;