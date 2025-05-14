// clients/createClient.ts
export async function createClient(baseURL: string, authContext: any, clientData: any) {
  console.log('Данные клиента для создания:', clientData); // 👈 логируем тело запроса

  const response = await authContext.post('/api/v1/Clients', {
    data: clientData,
  });

  const responseBody = await response.text(); // 👈 читаем как текст
  console.log('Ответ при создании клиента:', responseBody); // 👈 логируем ответ

  if (!response.ok()) {
    throw new Error(`Ошибка при создании клиента: ${response.status()}`);
  }

  return JSON.parse(responseBody);
}