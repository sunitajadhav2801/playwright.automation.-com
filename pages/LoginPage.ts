import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from '../pages/RegisterPage';

export class LoginPage{
    //page locators/object/OR
    private readonly page: Page;
    private readonly eleUtil;
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly warning: Locator;
    private readonly registerLink: Locator;

    //2. page class constructor
    constructor(page: Page)
    {
        this.page= page;
        this.eleUtil = new ElementUtil(page);
        this.emailId= page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password= page.getByRole('textbox', {name: 'Password'});
        this.loginBtn= page.locator(`input[type="submit"][value="Login"]`);
        this.warning= page.locator(`.alert.alert-danger.alert-dismissible`);
        this.registerLink = page.getByText('Register', {exact: true});
    }

    //3. page actions/methods
    async goToLoginPage(baseURL: string | undefined){
        await this.page.goto(baseURL+'?route=account/login');
    }
     
    /**
     * login to app using username/password
     * @param email 
     * @param password 
     * @returns 
     */
    async doLogin(email: string, password: string): Promise<HomePage>
    {
       await this.eleUtil.fill(this.emailId, email);
       await this.eleUtil.fill(this.password, password);
       await this.eleUtil.click(this.loginBtn, {force: true, timeout: 5000});
       return new HomePage(this.page);
    }

    /**
     * get the warning message incase of invalid login
     * @returns 
     */
    async getInvalidLoginMessage(): Promise<string | null>
    {
        const errorMsg = await this.eleUtil.getText(this.warning);
        console.log('Invalid login waring message: '+errorMsg);
        return errorMsg;
    }

    async navigateToRegisterPage(): Promise<RegisterPage>{
        await this.eleUtil.click(this.registerLink, {force: true}, 1);
        return new RegisterPage(this.page);
    }
}