import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Загружаем .env файл
dotenv.config();

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL, // Используем переменную из .env
        extraHTTPHeaders: {
            Authorization: `Bearer ${process.env.LOGIN}:${process.env.PASSWORD}`, // Пример авторизации с логином и паролем
        },
    },
});