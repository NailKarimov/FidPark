import { test, expect } from '@playwright/test';
import { login } from '../auth/login';
import { createClient } from '../clients/createClient';
import { getClient } from '../clients/getClient';
import { updateClient } from '../clients/updateClient';
import { deleteClient } from '../clients/deleteClient';
import { countClients } from '../clients/countClients';

test('Создание, обновление и удаление клиента', async () => {
  const baseURL = 'https://demo1.fidpark.com';
  const authContext = await login(baseURL, 'demo', 'Demo12345');

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
  console.log('Ответ при обновлении клиента:', updatedClient);

  const fetchedClient = await getClient(baseURL, authContext, clientID);
  expect(fetchedClient.email).toBe(updatedData.email);
  expect(fetchedClient.mobile).toBe(updatedData.mobile);

  const deleteStatus = await deleteClient(baseURL, authContext, clientID);
  expect(deleteStatus).toBe(204); // API возвращает 204, а не 200

  const finalCount = await countClients(baseURL, authContext);
  expect(finalCount).toBe(initialCount);

  await authContext.dispose();
});