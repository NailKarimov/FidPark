# Test info

- Name: Positive: create client with randomized valid data for Latvia area
- Location: C:\Users\karim\source\repos\FidPark\tests\faker.fidpark.positive.spec.ts:11:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 418
Received: 417
    at C:\Users\karim\source\repos\FidPark\tests\faker.fidpark.positive.spec.ts:48:24
```

# Test source

```ts
   1 | ﻿import { test, expect } from '@playwright/test';
   2 | import { faker } from '@faker-js/faker';
   3 | import { config } from '../config/config';
   4 | import { login } from '../auth/login';
   5 | import { createClient } from '../clients/createClient';
   6 | import { getClient } from '../clients/getClient';
   7 | import { deleteClient } from '../clients/deleteClient';
   8 | import { countClients } from '../clients/countClients';
   9 |
  10 |
  11 | test('Positive: create client with randomized valid data for Latvia area', async () => {
  12 |     const { baseURL, credentials } = config;
  13 |     const authContext = await login(baseURL, credentials.username, credentials.password);
  14 |
  15 |     const initialCount = await countClients(baseURL, authContext);
  16 |
  17 |     // Generate randomized client data for Latvia locale
  18 |     const newClientData = {
  19 |         lastNameOrCompany: faker.company.name(),
  20 |         firstName: faker.name.firstName(),
  21 |         persCodeOrRegNumber: faker.string.numeric(9), // ✔ правильный метод
  22 |         email: faker.internet.email(),
  23 |         mobile: `+371${faker.string.numeric(8)}`,
  24 |         clientTypeCode: 1,
  25 |         clientCode: faker.number.int({ min: 1000, max: 9999 }),
  26 |         clientGroupID: 4,
  27 |         useCommonGroupLimit: true,
  28 |         genderIsMale: faker.datatype.boolean(),
  29 |     };
  30 |
  31 |     console.log('Randomized client data:', newClientData);
  32 |
  33 |     const createdClient = await createClient(baseURL, authContext, newClientData);
  34 |     const clientID = createdClient.clientID;
  35 |
  36 |     const fetchedClient = await getClient(baseURL, authContext, clientID);
  37 |
  38 |     expect(fetchedClient.lastNameOrCompany).toBe(newClientData.lastNameOrCompany);
  39 |     expect(fetchedClient.firstName).toBe(newClientData.firstName);
  40 |     expect(fetchedClient.email).toBe(newClientData.email);
  41 |     expect(fetchedClient.mobile).toBe(newClientData.mobile);
  42 |
  43 |     // Cleanup - delete created client
  44 |     const deleteStatus = await deleteClient(baseURL, authContext, clientID);
  45 |     expect(deleteStatus).toBe(204);
  46 |
  47 |     const finalCount = await countClients(baseURL, authContext);
> 48 |     expect(finalCount).toBe(initialCount);
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  49 |
  50 |     await authContext.dispose();
  51 | });
  52 |
  53 |
```