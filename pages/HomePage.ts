import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { LoginPage } from '../pages/LoginPage';
import { ResultPage } from '../pages/ResultPage';
import { link } from 'fs';
import { threadCpuUsage } from 'process';

export class HomePage{
    //1. page locators/objects/OR(Object repository)
     readonly page: Page;
    private readonly eleUtil: ElementUtil;
    private readonly logoutLink: Locator;
    private readonly search: Locator;
    private readonly searhIcon: Locator;
    private readonly loginLink: Locator;

    //2. page constructor
    constructor(page: Page)
    {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
        this.search = page.getByPlaceholder('Search');
        this.searhIcon = page.locator('.btn.btn-default.btn-lg');
        this.loginLink = page.getByRole('link', {name: 'Login'});
    }

    //3. page actions
    async isUserLoggedIn(): Promise<boolean>{
        return await this.eleUtil.isVisible(this.logoutLink, 0);
    }
    async logOut() : Promise<LoginPage>{
        await this.eleUtil.click(this.logoutLink, {timeout: 5000}, 1);
        await this.eleUtil.click(this.loginLink, {timeout: 5000}, 1);
        return new LoginPage(this.page); 
    }

    async doSearch(searchKey: string)
    {
        console.log(`Search key: ${searchKey}`);
        await this.eleUtil.fill(this.search, searchKey);
        await this.eleUtil.click(this.searhIcon);
        return new ResultPage(this.page);
    }

}