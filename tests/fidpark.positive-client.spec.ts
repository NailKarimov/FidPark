import { test, expect } from '@playwright/test';
import { config } from '../config/config';
import { login } from '../auth/login';
import { createClient } from '../clients/createClient';
import { getClient } from '../clients/getClient';
import { updateClient } from '../clients/updateClient';
import { deleteClient } from '../clients/deleteClient';
import { countClients } from '../clients/countClients';

test('Creating, updating and deleting a client', async () => {
    const { baseURL, credentials } = config;
    const authContext = await login(baseURL, credentials.username, credentials.password);
    const initialCount = await countClients(baseURL, authContext);

    const newClientData = {
        lastNameOrCompany: 'Acme Ltd',
        firstName: 'John',
        persCodeOrRegNumber: '123456789',
        email: 'john.doe@example.com',
        mobile: '+1234567890',
        clientTypeCode: 1,
        clientCode: 1001,
        clientGroupID: 4,
        useCommonGroupLimit: true,
        genderIsMale: true,
    };

    const createdClient = await createClient(baseURL, authContext, newClientData);
    const clientID = createdClient.clientID;

    const updatedData = {
        email: 'new.email@example.com',
        mobile: '+9876543210',
    };

    const updatedClient = await updateClient(baseURL, authContext, clientID, updatedData);
    //console.log('Response when updating the client:', updatedClient);

    const fetchedClient = await getClient(baseURL, authContext, clientID);
    expect(fetchedClient.email).toBe(updatedData.email);
    expect(fetchedClient.mobile).toBe(updatedData.mobile);

    const deleteStatus = await deleteClient(baseURL, authContext, clientID);
    expect(deleteStatus).toBe(204); // API returns 204 instead of 200

    const finalCount = await countClients(baseURL, authContext);
    expect(finalCount).toBe(initialCount);

    await authContext.dispose();
});