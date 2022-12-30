const { Builder, By, Key, until } = require( 'selenium-webdriver'  );
const { MonitoredObject }         = require( 'monitored-object-ts' );

//** @class ROLPage */
class ROLPage extends MonitoredObject {
    constructor( new_id_arg, data_source_location_arg ) {
        super({ new_id: new_id_arg, data_source_location: data_source_location_arg });
        this.baseUrl = 'https://www.bankofamerica.com';
        this.driver = new Builder().forBrowser( 'chrome' )/*.setChromeOptions( options )*/.build(); }

    async openSite() {
        this.baseUrl = 'http://rivertest-two.americansjewelry.com/goals/';
        this.logUpdate( "getting this.baseUrl..." );
        this.driver.manage().window().setRect( { width: 1342, height: 799 } );
        await this.driver.get( this.baseUrl ); 
        
        // this.logUpdate( "waiting for div class staticcallbutton to be elementLocated..." );
        
        // await this.driver.wait( until.elementLocated( By.xpath( '//div[@class="staticcallbutton"]' ) ), 30 * 1000 ); 
        
        // this.logUpdate( "got the phone icon." );
    }

//     async click_phone() {
//         this.logUpdate( "waiting for elementLocated " + '//div[@class="staticcallbutton"]' + "..." );
//         await this.driver.wait( until.elementLocated({ xpath: '//div[@class="staticcallbutton"]' }), 30 * 1000 );
//         this.logUpdate( "located element.  clicking phone icon..." );
//         var sign_on = await this.driver.findElement({ xpath: '//div[@class="staticcallbutton"]' });
//         await sign_on.click();
//     }

//     async wait_for_chatbox_visible() {
//         let chatbox = By.xpath( '//div[@class="chatbox"]' );
//         this.logUpdate( "waiting for chatbox to be clickable..." );
//         await this.driver.wait( until.elementLocated( chatbox ), 30 * 1000 ); }

//     async login() {
//         let login_link = By.xpath( '//select[@id="onlineIdSelect"]' );
//         this.logUpdate( "getting this.baseUrl..." );
//         await this.driver.get( this.baseUrl );
//         this.logUpdate( "waiting for \"//select[@id=\"onlineIdSelect\"]\" to be elementLocated..." );
//         await this.driver.wait( until.elementLocated( login_link ), 30 * 1000 );
//         this.logUpdate( 'Login screen loaded.' ); }

//     async click_login() {
//         let login_link = By.xpath( '//a[@id="LOGIN_MEDIUM"]' );
//         await this.driver.findElement( login_link ).click(); }

//     async wait_for_user_id() {
//         this.logUpdate( "waiting for user id to be clickable inside boa object..." );
//         let userid = By.xpath( '//input[@id="onlineId1"]' );
//         await this.driver.wait( until.elementLocated( userid ), 30 * 1000 ); 
//         this.logUpdate( "user id found in boa object..." ); }

//     async enter_user_id() {
//         var useridclickable = this.driver.findElement({ xpath: '//input[@id="onlineId1"]' });
//         await useridclickable.click();
//         await useridclickable.sendKeys( 'bom93778108' ); }

//     async enter_password() {
//         var password_clickable = this.driver.findElement({ xpath: '//input[@id="passcode1"]' });
//         await password_clickable.click();
//         await password_clickable.sendKeys( process.argv[ 4 ] ); }

//     async click_sign_in() {
//         this.logUpdate( "finding sign in button..." );
//         var sign_on = this.driver.findElement({ xpath: '//button[@id="signIn"]' });
//         this.logUpdate( "clicking sign_on button..." ); 
//         await sign_on.click(); }
    
//     async wait_for_balance() {
//         let balance_span = By.xpath( '//div[@class="AccountBalance"]' );
//         this.logUpdate( "waiting for balance to be clickable..." );
//         await this.driver.wait( until.elementLocated( balance_span ), 30 * 1000 ); }

//     async get_balance() {
//         return this.driver.findElement({ xpath: '//div[@class="AccountBalance"]' }).getText(); }

     async driver_quit() { await this.driver.quit(); }    
 }

module.exports = ROLPage;