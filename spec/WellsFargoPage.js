/** @class WellsFargoPage */
const { Builder, By, Key, until } = require( 'selenium-webdriver' );
class WellsFargoPage {
    
    constructor() { 
        require( 'chromedriver' ); // require and build driver... j_username
        this.driver = new Builder().forBrowser( 'chrome' ).build();
        this.baseUrl = 'https://wellsfargo.com'; 
        this.xpath_user_id = '//input[@id="j_username"]';                       // user id input
        this.xpath_passcode_one = '//input[@id="j_password"]';                  // password input
        this.xpath_first_login_link = '//div[@class="ps-masthead-sign-on"]';    // password input
        this.xpath_balance = '//span[@class="ps-balance-amount"]';              // balance text
        this.xpath_sign_in_button = '//*[contains(text(), "Sign on")]';        // sign on button
    }

    login = async function () {
        console.log( "getting url..." );
        await this.driver.get( this.baseUrl );
        console.log( "waiting for " + this.xpath_first_login_link + " to be elementLocated..." );
        await this.driver.wait( until.elementLocated({ xpath: this.xpath_first_login_link }), 30 * 1000 );
        console.log( 'Login screen loaded.' ); }

    async click_login() { 
        console.log( "waiting for login link to be clickable..." );
        await this.driver.findElement({ xpath: this.xpath_first_login_link }).click(); 
        console.log( "login link clicked..." ); }

    async wait_for_user_id() {
        console.log( "waiting for user id to be clickable inside boa object..." );
        let userid = By.xpath( this.xpath_user_id );
        await this.driver.wait( until.elementLocated( userid ), 30 * 1000 ); 
        console.log( "user id found in boa object..." ); }

    async enter_user_id() {
        var useridclickable = this.driver.findElement({ xpath: this.xpath_user_id });
        console.log( "finding user id to click..." );
        await useridclickable.click();
        console.log( "user id clicked..." );
        await useridclickable.sendKeys( 'lxa12pf' ); 
        console.log( "user id entered..." ); }

    async enter_password() {
        console.log( "finding password input to click..." );
        var password_clickable = this.driver.findElement({ xpath: this.xpath_passcode_one });
        console.log( "clicking password..." );
        await password_clickable.click();
        console.log( "sending password..." );
        await password_clickable.sendKeys( 'jan02@Th' ); 
        console.log( "password entered..." ); }

    async click_sign_in() {
        console.log( "finding sign in button..." );
        var sign_on = this.driver.findElement({ xpath: this.xpath_sign_in_button });
        console.log( "clicking sign_on button..." ); 
        await sign_on.click(); }

    async wait_for_balance() {
        let balance_span = By.xpath( this.xpath_balance );
        console.log( "waiting for balance to be clickable..." );
        await this.driver.wait( until.elementLocated( balance_span ), 30 * 1000 ); }

    async driver_quit() { await this.driver.quit(); } 
}

module.exports = WellsFargoPage;
