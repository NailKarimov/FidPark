// auth/login.ts
import { request } from '@playwright/test';

export async function login(baseURL: string, username: string, password: string) {
    // Create temporary context for initial login request
    const apiContext = await request.newContext({ baseURL });

    const loginResponse = await apiContext.post('/api/v1/Account/login', {
        data: {
            Username: username,
            Password: password,
        },
    });

    if (!loginResponse.ok()) {
        throw new Error(`Authorization failed: ${loginResponse.status()}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData?.Token;

    if (!token) {
        throw new Error('Token was not received');
    }

    // ✅ Create authenticated context with the received token
    const authContext = await request.newContext({
        baseURL,
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    // ❗ Dispose of the initial temporary context
    await apiContext.dispose();

    return authContext;
}
