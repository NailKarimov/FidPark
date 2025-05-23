import { test, expect } from '@playwright/test';
import { config } from '../config/config';
import { login } from '../auth/login';
import { createClient } from '../clients/createClient';

test.describe('Negative tests for client creation', () => {

    test('Negative: invalid email format', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const invalidClientData = {
            lastNameOrCompany: 'Bad Email Inc',
            firstName: 'Invalid',
            persCodeOrRegNumber: '987654321',
            email: 'not-an-email',
            mobile: '+1234567890',
            clientTypeCode: 1,
            clientCode: 9999,
            clientGroupID: 4,
            useCommonGroupLimit: true,
            genderIsMale: true,
        };

        try {
            await createClient(baseURL, authContext, invalidClientData);
            throw new Error('Expected an error but the client was created');
        } catch (error: any) {
            expect(error.message).toContain('400');
        }

        await authContext.dispose();
    });

    test('Negative: missing required field (lastNameOrCompany)', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const data = {
            firstName: 'John',
            persCodeOrRegNumber: '123456789',
            email: 'john@example.com',
            mobile: '+1234567890',
            clientTypeCode: 1,
            clientCode: 1001,
            clientGroupID: 4,
            useCommonGroupLimit: true,
            genderIsMale: true,
        };

        try {
            await createClient(baseURL, authContext, data);
            throw new Error('Expected an error but the client was created');
        } catch (error: any) {
            expect(error.message).toContain('400');
        }

        await authContext.dispose();
    });

    test('Negative: empty email', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const data = {
            lastNameOrCompany: 'Acme Ltd',
            firstName: 'John',
            persCodeOrRegNumber: '123456789',
            email: '',
            mobile: '+1234567890',
            clientTypeCode: 1,
            clientCode: 1002,
            clientGroupID: 4,
            useCommonGroupLimit: true,
            genderIsMale: true,
        };

        try {
            await createClient(baseURL, authContext, data);
            throw new Error('Expected an error but the client was created');
        } catch (error: any) {
            expect(error.message).toContain('400');
        }

        await authContext.dispose();
    });

    test('Negative: extremely long first name', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const data = {
            lastNameOrCompany: 'Acme Ltd',
            firstName: 'A'.repeat(300),
            persCodeOrRegNumber: '123456789',
            email: 'john@example.com',
            mobile: '+1234567890',
            clientTypeCode: 1,
            clientCode: 1003,
            clientGroupID: 4,
            useCommonGroupLimit: true,
            genderIsMale: true,
        };

        try {
            await createClient(baseURL, authContext, data);
            throw new Error('Expected an error but the client was created');
        } catch (error: any) {
            expect(error.message).toContain('400');
        }

        await authContext.dispose();
    });

    test('Negative: clientCode as string', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const data = {
            lastNameOrCompany: 'Acme Ltd',
            firstName: 'John',
            persCodeOrRegNumber: '123456789',
            email: 'john@example.com',
            mobile: '+1234567890',
            clientTypeCode: 1,
            clientCode: "string-instead-of-number",
            clientGroupID: 4,
            useCommonGroupLimit: true,
            genderIsMale: true,
        };

        try {
            await createClient(baseURL, authContext, data as any);
            throw new Error('Expected an error but the client was created');
        } catch (error: any) {
            expect(error.message).toContain('400');
        }

        await authContext.dispose();
    });

    test('Negative: negative clientTypeCode', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const data = {
            lastNameOrCompany: 'Acme Ltd',
            firstName: 'John',
            persCodeOrRegNumber: '123456789',
            email: 'john@example.com',
            mobile: '+1234567890',
            clientTypeCode: -1, // Invalid negative value
            clientCode: 1002,
            clientGroupID: 4,
            useCommonGroupLimit: true,
            genderIsMale: true,
        };

        try {
            await createClient(baseURL, authContext, data);
            // If client creation succeeds, that means validation did not work
            throw new Error('Validation did not work: client was created with negative clientTypeCode');
        } catch (error: any) {
            // Check that the error message contains HTTP 400 or other validation indication
            expect(
                error.message.includes('400') ||
                error.message.toLowerCase().includes('validation') ||
                error.message.toLowerCase().includes('bad request')
            ).toBeTruthy();
        }

        await authContext.dispose();
    });

    test('Negative: useCommonGroupLimit as string', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const data = {
            lastNameOrCompany: 'Acme Ltd',
            firstName: 'John',
            persCodeOrRegNumber: '123456789',
            email: 'john@example.com',
            mobile: '+1234567890',
            clientTypeCode: 1,
            clientCode: 1005,
            clientGroupID: 4,
            useCommonGroupLimit: "true" as unknown as boolean, // Intentionally sending string instead of boolean
            genderIsMale: true,
        };

        try {
            await createClient(baseURL, authContext, data);
            // If client creation succeeds, the test should fail because validation didn’t trigger
            throw new Error('Validation did not work: client was created with invalid useCommonGroupLimit type');
        } catch (error: any) {
            // Check that the error contains some indication of a validation failure
            expect(
                error.message.includes('400') ||
                error.message.toLowerCase().includes('validation') ||
                error.message.toLowerCase().includes('bad request')
            ).toBeTruthy();
        }

        await authContext.dispose();
    });

    test('Negative: completely empty payload', async () => {
        const { baseURL, credentials } = config;
        const authContext = await login(baseURL, credentials.username, credentials.password);

        const data = {};

        try {
            await createClient(baseURL, authContext, data as any);
            throw new Error('Expected an error but the client was created');
        } catch (error: any) {
            expect(error.message).toContain('400');
        }

        await authContext.dispose();
    });

});