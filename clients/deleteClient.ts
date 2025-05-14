export async function deleteClient(baseURL: string, authContext: any, clientID: number) {
  const response = await authContext.delete(`${baseURL}/api/v1/Clients/${clientID}`);

  return response.status();
}