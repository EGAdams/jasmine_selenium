//** @class BandOfAmericaPage */
const { Builder, By, Key, until } = require( 'selenium-webdriver' );
class CarWashPage {
    constructor() {
        // Setting variables for our testcase
        this.baseUrl = 'https://floridascarwash.com'                // base url
        this.xpath_phone_icon = '//div[@class="staticcallbutton"]'; // phone icon
        this.xpath_first_login_link = '//a[@id="LOGIN_MEDIUM"]';    // login link
        this.xpath_user_id = '//input[@id="onlineId1"]';            // user id input
        this.xpath_passcode_one = '//input[@id="passcode1"]';       // password input
        this.xpath_balance = '//div[@class="AccountBalance"]';      // balance text
        this.sign_in_button = '//button[@id="signIn"]';             // sign in button
        this.open_account_button = '//span[@class="spa-btn"]';      // open account button
        require( 'chromedriver' );                                  // require and build driver...
        this.driver = new Builder().forBrowser( 'chrome' ).build(); }

    async openSite() {
        console.log( "getting this.baseUrl..." );
        await this.driver.get( this.baseUrl ); 
        console.log( "waiting for " + this.xpath_phone_icon + " to be elementLocated..." );
        await this.driver.wait( until.elementLocated( By.xpath( this.xpath_phone_icon ) ), 30 * 1000 ); 
        console.log( "got the phone icon." );}

    async click_phone() {
        console.log( "waiting for elementLocated " + this.xpath_phone_icon + "..." );
        await this.driver.wait( until.elementLocated({ xpath: this.xpath_phone_icon }), 30 * 1000 );
        console.log( "located element.  clicking phone icon..." );
        var sign_on = await this.driver.findElement({ xpath: this.xpath_phone_icon });
        await sign_on.click();
    }

    async wait_for_chatbox_visible() {
        let chatbox = By.xpath( '//div[@class="chatbox"]' );
        console.log( "waiting for chatbox to be clickable..." );
        await this.driver.wait( until.elementLocated( chatbox ), 30 * 1000 ); }

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
        var useridclickable = this.driver.findElement({ xpath: this.xpath_user_id });
        await useridclickable.click();
        await useridclickable.sendKeys( 'bom93778108' ); }

    async enter_password() {
        var password_clickable = this.driver.findElement({ xpath: this.xpath_passcode_one });
        await password_clickable.click();
        await password_clickable.sendKeys( process.argv[ 4 ] ); }

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

module.exports = CarWashPage;