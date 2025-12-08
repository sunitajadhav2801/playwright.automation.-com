import{ test, expect } from "../fixtures/basefixture";
import { ResultPage } from '../pages/ResultPage';

//data provider for product search key and results count
let searchData = [
    { searchKey: 'Macbook', resultCount: 3},
    { searchKey: 'Sumsung', resultCount: 2},
    {searchKey: 'imac', resultCount: 1},
    {searchKey: 'canon', resultCount: 1},
    {searchKey: 'Dummy', resultCount: 0},
];

for(let product of searchData)
{
test(`verify product search ${product.searchKey}`, async ({homePage}) => {
     
     let resultPage: ResultPage = await homePage.doSearch(product.searchKey);
      expect(await resultPage.getSearchResultsCount()).toBe(product.resultCount);
      
});
}