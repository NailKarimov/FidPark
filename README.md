# 🎯 FidPark Playwright Tests

## 📚 Project Overview

This project contains a suite of automated API tests for the FidPark system, developed using **Playwright** for testing and **Faker.js** for generating randomized test data.

The goal is to validate client-related functionality, such as client creation, field validation, updating, and deletion — using both **positive** and **negative** test scenarios.

---

## ⚙️ Installation

First, install the required dependencies:

```bash
npm install
```

If you’re starting from scratch, also install Playwright and TypeScript:

```bash
npm install -D typescript @playwright/test
npx playwright install
```

If you don’t have a TypeScript config, initialize it:

```bash
npx tsc --init
```

---

## 🧪 Test Files

| Test File                                | Description                                                                 |
|------------------------------------------|-----------------------------------------------------------------------------|
| `faker.fidpark.positive.spec.ts`         | Positive test using randomly generated client data via Faker               |
| `fidpark.positive-client.spec.ts`        | Manual positive test for client creation, update, and deletion             |
| `fidpark.negative-client.spec.ts`        | Negative tests for invalid input, empty fields, and edge-case scenarios    |

---

## 🧬 Test Descriptions

### ✅ `faker.fidpark.positive.spec.ts`

- Uses the [Faker.js](https://fakerjs.dev/) library to generate unique and randomized data for:
  - First name
  - Company name
  - Email
  - Mobile phone number (`+371` for Latvia)
  - Client code
  - Personal code or registration number
- Validates:
  - Client creation
  - Data saved correctly in the system
  - Client deletion and count consistency

#### 💡 Benefits of using Faker

- Prevents hardcoded duplicate values
- Simplifies generation of dynamic and unique test data
- Can simulate real-world formats (like Latvian phone numbers)
- Makes tests more maintainable and scalable

---

### ✅ `fidpark.positive-client.spec.ts`

- Logs in via API
- Creates a new client with hardcoded valid data
- Updates the client (email & mobile)
- Verifies updated fields
- Deletes the client
- Confirms client count remains unchanged

### ❌ `fidpark.negative-client.spec.ts`

- Attempts to create clients with invalid or missing data:
  - Invalid email formats
  - Empty required fields
  - Extremely long strings
  - Incorrect data types (e.g., string instead of number)
- Verifies the system returns appropriate errors (usually HTTP 400)
- Ensures that no invalid clients are created

---

## 🚀 Run Tests

### Run individual test files:

```bash
npx playwright test tests/faker.fidpark.positive.spec.ts
npx playwright test tests/fidpark.positive-client.spec.ts
npx playwright test tests/fidpark.negative-client.spec.ts
```

### Run all tests:

```bash
npx playwright test
```

---

## 📊 View HTML Test Report

After running tests, open the last HTML report:

```bash
npx playwright show-report
```

It displays:
- ✅ Passed and ❌ failed tests
- Logs and console output
- Time per test
- Screenshot and trace support (if enabled)

---

## 🛠 Requirements

- Node.js >= 16
- NPM >= 8
- Playwright >= 1.39
- Faker.js >= 9.8.0
- TypeScript >= 4.5

---

Happy Testing! 🚀