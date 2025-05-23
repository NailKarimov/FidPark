import { defineConfig } from '@playwright/test';


export default defineConfig({
    reporter: [['html', { open: 'never' }]],
    testMatch: ['**/*.spec.ts'],
    use: {
        baseURL: process.env.BASE_URL, // Используем переменную из .env
        extraHTTPHeaders: {
            Authorization: `Bearer ${process.env.LOGIN}:${process.env.PASSWORD}`, // Пример авторизации с логином и паролем
        },
    },
});