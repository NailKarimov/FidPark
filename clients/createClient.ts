// clients/createClient.ts
export async function createClient(baseURL: string, authContext: any, clientData: any) {
    console.log('Client data for creation:', clientData); // 👈 log request body

    const response = await authContext.post('/api/v1/Clients', {
        data: clientData,
    });

    const responseBody = await response.text(); // 👈 read response as text
    //console.log('Response when creating client:', responseBody); // 👈 log response

    if (!response.ok()) {
        throw new Error(`Error while creating client: ${response.status()}`);
    }

    return JSON.parse(responseBody);
}