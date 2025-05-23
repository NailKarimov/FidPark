# Test info

- Name: Creating, updating and deleting a client
- Location: C:\Users\karim\source\repos\FidPark\tests\fidpark.positive-client.spec.ts:10:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 417
Received: 418
    at C:\Users\karim\source\repos\FidPark\tests\fidpark.positive-client.spec.ts:47:24
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { config } from '../config/config';
   3 | import { login } from '../auth/login';
   4 | import { createClient } from '../clients/createClient';
   5 | import { getClient } from '../clients/getClient';
   6 | import { updateClient } from '../clients/updateClient';
   7 | import { deleteClient } from '../clients/deleteClient';
   8 | import { countClients } from '../clients/countClients';
   9 |
  10 | test('Creating, updating and deleting a client', async () => {
  11 |     const { baseURL, credentials } = config;
  12 |     const authContext = await login(baseURL, credentials.username, credentials.password);
  13 |     const initialCount = await countClients(baseURL, authContext);
  14 |
  15 |     const newClientData = {
  16 |         lastNameOrCompany: 'Acme Ltd',
  17 |         firstName: 'John',
  18 |         persCodeOrRegNumber: '123456789',
  19 |         email: 'john.doe@example.com',
  20 |         mobile: '+1234567890',
  21 |         clientTypeCode: 1,
  22 |         clientCode: 1001,
  23 |         clientGroupID: 4,
  24 |         useCommonGroupLimit: true,
  25 |         genderIsMale: true,
  26 |     };
  27 |
  28 |     const createdClient = await createClient(baseURL, authContext, newClientData);
  29 |     const clientID = createdClient.clientID;
  30 |
  31 |     const updatedData = {
  32 |         email: 'new.email@example.com',
  33 |         mobile: '+9876543210',
  34 |     };
  35 |
  36 |     const updatedClient = await updateClient(baseURL, authContext, clientID, updatedData);
  37 |     //console.log('Response when updating the client:', updatedClient);
  38 |
  39 |     const fetchedClient = await getClient(baseURL, authContext, clientID);
  40 |     expect(fetchedClient.email).toBe(updatedData.email);
  41 |     expect(fetchedClient.mobile).toBe(updatedData.mobile);
  42 |
  43 |     const deleteStatus = await deleteClient(baseURL, authContext, clientID);
  44 |     expect(deleteStatus).toBe(204); // API returns 204 instead of 200
  45 |
  46 |     const finalCount = await countClients(baseURL, authContext);
> 47 |     expect(finalCount).toBe(initialCount);
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  48 |
  49 |     await authContext.dispose();
  50 | });
```