//** @class BandOfAmericaPage */
const { Builder, By, Key, until } = require( 'selenium-webdriver' );
class BankOfAmericaPage {
    constructor() {
        // Setting variables for our testcase
        this.baseUrl = 'https://www.bankofamerica.com'              // base url
        this.xpath_first_login_link = '//a[@id="LOGIN_MEDIUM"]';    // login link
        this.xpath_user_id = '//input[@id="onlineId1"]';            // user id input
        this.xpath_passcode_one = '//input[@id="passcode1"]';       // password input
        this.xpath_balance = '//div[@class="AccountBalance"]';      // balance text
        this.sign_in_button = '//button[@id="signIn"]';             // sign in button
        this.open_account_button = '//span[@class="spa-btn"]';      // open account button
        require( 'chromedriver' );                                  // require and build driver...
        this.driver = new Builder().forBrowser( 'chrome' ).build(); }

    async login() {
        let login_link = By.xpath( '//select[@id="onlineIdSelect"]' );
        await this.driver.get( this.baseUrl );
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
        var useridclickable = this.driver.findElement({ xpath: this.xpath_user_id });
        await useridclickable.click();
        await useridclickable.sendKeys( 'bom93778108' ); }

    async enter_password() {
        var password_clickable = this.driver.findElement({ xpath: this.xpath_passcode_one });
        await password_clickable.click();
        await password_clickable.sendKeys( 'dec02@Th' ); }

    async click_sign_in() {
        console.log( "finding sign in button..." );
        var sign_on = this.driver.findElement({ xpath: this.sign_in_button });
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