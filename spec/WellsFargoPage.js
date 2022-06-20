/** @class WellsFargoPage */
class WellsFargoPage {

    constructor() {
        // Setting variables for our testcase
        const baseUrl = 'https://wellsfargo.com'
    }

    login = async function () {
        let login_link = By.xpath( '//a[@class="ps-sign-on-text"]' );
        await driver.get( this.baseUrl );
        await driver.wait( until.elementLocated( login_link ), 30 * 1000 );
        console.log( 'Login screen loaded.' )
    }
}
