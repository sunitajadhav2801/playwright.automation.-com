import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { LoginPage } from '../pages/LoginPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';


export class ResultPage{
    //1. page locators/objects/OR(Object repository)
    private readonly page: Page;
    private readonly eleUtil: ElementUtil;
   private readonly results: Locator;

    //2. page constructor
    constructor(page: Page)
    {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.results = page.locator('.product-thumb');
    }
     
    async getSearchResultsCount(): Promise<number>{
        return await this.results.count();
    }
 
    async selectProduct(productName: string){
      console.log('========product name======='+productName);
      await this.eleUtil.click(this.page.getByRole('link', { name: `${productName}` }));
      return new ProductInfoPage(this.page);
    }
}