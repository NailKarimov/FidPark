export async function deleteClient(baseURL: string, authContext: any, clientID: number) {
    // Send DELETE request to remove client by ID
    const response = await authContext.delete(`${baseURL}/api/v1/Clients/${clientID}`);

    return response.status();
}
