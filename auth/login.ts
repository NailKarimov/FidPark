// auth/login.ts
import { request } from '@playwright/test';

export async function login(baseURL: string, username: string, password: string) {
  const apiContext = await request.newContext({ baseURL });

  const loginResponse = await apiContext.post('/api/v1/Account/login', {
    data: {
      Username: username,
      Password: password,
    },
  });

  if (!loginResponse.ok()) {
    throw new Error(`Ошибка авторизации: ${loginResponse.status()}`);
  }

  const loginData = await loginResponse.json();
  const token = loginData?.Token;

  if (!token) {
    throw new Error('Токен не получен');
  }

  // ✅ Создаем контекст с токеном
  const authContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ❗ Закрываем первый временный контекст
  await apiContext.dispose();

  return authContext;
}