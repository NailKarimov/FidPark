export async function getClient(baseURL: string, authContext: any, clientID: number) {
    const response = await authContext.get(`${baseURL}/api/v1/Clients/${clientID}`);

    if (!response.ok()) {
        throw new Error(`Failed to fetch client with ID ${clientID}: ${response.status()}`);
    }

    return await response.json();
}