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
        throw new Error(`Failed to update client: ${response.status()}`);
    }

    // Do not attempt to parse JSON if the body is empty
    return response.status();
}
