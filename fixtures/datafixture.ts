import { test as base, expect } from "../fixtures/basefixture";

import fs from 'fs';
import { parse } from 'csv-parse/sync';


//schema/type of reg data fields
type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

//let registerationData: RegData[] = JSON.parse(fs.readFileSync('./data/register.json', 'utf-8'));





type csvFixture = {
    regData: RegData[]
}

export const dataTest = base.extend<csvFixture>({

   regData: async({ }, use)=> {
       
    let fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
    let registerationData:RegData[]  = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});
    await use(registerationData);
    }
});


export{expect};