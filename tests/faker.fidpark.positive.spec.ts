import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { config } from '../config/config';
import { login } from '../auth/login';
import { createClient } from '../clients/createClient';
import { getClient } from '../clients/getClient';
import { deleteClient } from '../clients/deleteClient';
import { countClients } from '../clients/countClients';


test('Positive: create client with randomized valid data for Latvia area', async () => {
    const { baseURL, credentials } = config;
    const authContext = await login(baseURL, credentials.username, credentials.password);

    const initialCount = await countClients(baseURL, authContext);

    // Generate randomized client data for Latvia locale
    const newClientData = {
        lastNameOrCompany: faker.company.name(),
        firstName: faker.name.firstName(),
        persCodeOrRegNumber: faker.string.numeric(9), // ✔ правильный метод
        email: faker.internet.email(),
        mobile: `+371${faker.string.numeric(8)}`,
        clientTypeCode: 1,
        clientCode: faker.number.int({ min: 1000, max: 9999 }),
        clientGroupID: 4,
        useCommonGroupLimit: true,
        genderIsMale: faker.datatype.boolean(),
    };

    console.log('Randomized client data:', newClientData);

    const createdClient = await createClient(baseURL, authContext, newClientData);
    const clientID = createdClient.clientID;

    const fetchedClient = await getClient(baseURL, authContext, clientID);

    expect(fetchedClient.lastNameOrCompany).toBe(newClientData.lastNameOrCompany);
    expect(fetchedClient.firstName).toBe(newClientData.firstName);
    expect(fetchedClient.email).toBe(newClientData.email);
    expect(fetchedClient.mobile).toBe(newClientData.mobile);

    // Cleanup - delete created client
    const deleteStatus = await deleteClient(baseURL, authContext, clientID);
    expect(deleteStatus).toBe(204);

    const finalCount = await countClients(baseURL, authContext);
    expect(finalCount).toBe(initialCount);

    await authContext.dispose();
});

