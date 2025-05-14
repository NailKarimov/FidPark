import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// ��������� .env ����
dotenv.config();

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL, // ���������� ���������� �� .env
        extraHTTPHeaders: {
            Authorization: `Bearer ${process.env.LOGIN}:${process.env.PASSWORD}`, // ������ ����������� � ������� � �������
        },
    },
});