export async function countClients(baseURL: string, authContext: any): Promise<number> {
    const response = await authContext.get(`${baseURL}/api/v1/Clients/$count`);

    if (!response.ok()) {
        throw new Error(`Failed to retrieve client count: ${response.status()}`);
    }

    const countText = await response.text();
    return parseInt(countText, 10);
}
