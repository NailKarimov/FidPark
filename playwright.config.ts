import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// ��������� .env ����
dotenv.config();

export default defineConfig({
    reporter: [['html', { open: 'never' }]],
    use: {
        baseURL: process.env.BASE_URL, // ���������� ���������� �� .env
        extraHTTPHeaders: {
            Authorization: `Bearer ${process.env.LOGIN}:${process.env.PASSWORD}`, // ������ ����������� � ������� � �������
        },
    },
});