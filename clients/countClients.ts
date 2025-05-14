export async function countClients(baseURL: string, authContext: any): Promise<number> {
  const response = await authContext.get(`${baseURL}/api/v1/Clients/$count`);

  if (!response.ok()) {
    throw new Error(`Ошибка получения количества клиентов: ${response.status()}`);
  }

  const countText = await response.text();
  return parseInt(countText, 10);
}