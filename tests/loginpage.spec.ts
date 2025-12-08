
import { LoginPage } from '../pages/LoginPage';

import{ test, expect } from "../fixtures/basefixture";

//aaa pattern
test('verify valid login @login',
    {
        annotation: [
            {type: 'epic', description: 'EPIC 120 -Design login page of open cart app'},
            {type: 'feature', description: 'Login page feature'},
            {type: 'story', description: 'US-30 -user can login to app'},
            {type: 'owner', description: 'Sunita Jadhav'}
        ]
    }, async({ homePage }) => {

    await expect(homePage.page).toHaveTitle('My Account');

});

test.skip('verify invalid login', async({ page, baseURL}) =>{
let loginPage = new LoginPage(page);
await loginPage.goToLoginPage(baseURL);
 await loginPage.doLogin('pwtest@test.com', 'test12345');
   const errorMsg = await loginPage.getInvalidLoginMessage();
    expect(errorMsg).toContain('No match for E-Mail');
})
