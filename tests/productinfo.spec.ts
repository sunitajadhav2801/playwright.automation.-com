import { ProductInfoPage } from '../pages/ProductInfoPage';
import { ResultPage } from '../pages/ResultPage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import{ test, expect } from "../fixtures/basefixture";
import { hostname } from 'os';

let search = [
    {searchKey: 'macbook', productName: 'MacBook Pro', imageCount: 4},
    {searchKey: 'macbook', productName: 'MacBook Air', imageCount: 4 },
    {searchKey: 'samsung', productName: 'Samsung Galaxy Tab 10.1', imageCount: 7},
];

for(let product of search){

test(`verify product header ${product.productName}`,{ tag: ['@product', '@sanity', '@regression']}, async({ homePage }) =>{
   
   let resultPage: ResultPage = await homePage.doSearch(product.searchKey);
     let productInfoPage: ProductInfoPage = await  resultPage.selectProduct(product.productName);
     
      expect(await productInfoPage.getProductHeader()).toBe(product.productName);
}); 
}

for(let product of search)
    {
test(`verify product images ${product.productName} : ${product.imageCount}`, async({ homePage }) =>{
  
   let resultPage: ResultPage = await homePage.doSearch(product.searchKey);
    let productInfoPage: ProductInfoPage = await  resultPage.selectProduct(product.productName);
    expect(await productInfoPage.getProductImageCount()).toBe(product.imageCount);
}); 
}

// let productMeta = [
//     { productName: 'MacBook Pro', imageCount: 4, header: 'MacBook Pro', Brand: 'Apple', ProductCode: 'Product 18',   },
//     { productName: 'MacBook Air', imageCount: 4 },
//     { productName: 'Samsung Galaxy Tab 10.1', imageCount: 7},
// ];

test(`verify product metadata @smoke`, async({ homePage }) =>{
   
   let resultPage: ResultPage = await homePage.doSearch('macbook');
    let productInfoPage: ProductInfoPage = await  resultPage.selectProduct('MacBook Pro');
    let actualProductFullDetails = await productInfoPage.getProductDetails(); //actualProductFullDetails -hasmap
    
    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('Brand')).toBe('Apple');
    
    expect.soft(actualProductFullDetails.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductFullDetails.get('Reward Points')).toBe('800');
    
    expect.soft(actualProductFullDetails.get('Availability')).toBe('Out Of Stock');


}); 

test(`verify product pricing`, async({ homePage }) =>{
   
   let resultPage: ResultPage = await homePage.doSearch('macbook');
    let productInfoPage: ProductInfoPage = await  resultPage.selectProduct('MacBook Pro');
    let actualProductFullDetails = await productInfoPage.getProductDetails(); //actualProductFullDetails -hasmap
    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('price')).toBe('$2,000.00');
    expect.soft(actualProductFullDetails.get('extaxprice')).toBe('$2,000.00');


}); 