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
    throw new Error(`������ ��� ���������� �������: ${response.status()}`);
  }

  // �� �������� ������� JSON, ���� ���� ������
  return response.status();
}