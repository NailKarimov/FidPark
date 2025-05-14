// clients/updateClient.ts
import { APIRequestContext } from '@playwright/test';

export async function updateClient(
  baseURL: string,
  authContext: APIRequestContext,
  clientID: number,
  updatedData: Record<string, any>
): Promise<number> {
  const response = await authContext.patch(`/api/v1/Clients/${clientID}`, {
    data: updatedData,
  });

  if (!response.ok()) {
    throw new Error(`Ошибка при обновлении клиента: ${response.status()}`);
  }

  // Не пытаемся парсить JSON, если тело пустое
  return response.status();
}