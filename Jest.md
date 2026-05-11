# Jest Testing Documentation

Welcome to the testing documentation for the Ancura Mobile Project! This guide will help you understand how our testing environment is set up, how to run tests, and how to write new ones.

## Installation & Setup

We use **Jest** along with **Expo's Jest Preset** and **React Native Testing Library** to write and run our unit tests. 

The environment has already been configured for you in `package.json`. If you are setting this up from scratch or reinstalling in the future, these are the core dependencies used:

```bash
npm install --save-dev jest-expo @testing-library/react-native @testing-library/jest-native @types/jest ts-jest
```

### Configuration Files
- `jest.config.js`: Tells Jest how to map absolute paths (e.g., `@components/*`), which files to look for, and which modules to ignore during transformation.
- `jest.setup.js`: Contains global mocks for Native Modules that do not run in a Node.js environment (e.g., `expo-secure-store`, `expo-local-authentication`, and `AsyncStorage`).
- `__mocks__/fileMock.js`: A simple stub used to prevent Jest from crashing when it encounters image or SVG imports.

## How to Run Tests

Running tests is straightforward. Simply open your terminal and run:

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs automatically when you save a file)
npm test -- --watch

# Run tests and generate a code coverage report
npm test -- --coverage
```

## How the Tests Work

Our tests are generally divided into two categories: **Service Tests** and **Component/Screen Tests**.

### 1. Service Tests (e.g., `authService.test.ts`)
These tests verify pure business logic. We use `jest.mock()` to fake external API calls (like `axios` or `supabase`). 
- **Arrange:** We set up the mock returns (e.g., mocking a successful API response from Supabase).
- **Act:** We call the function we want to test (e.g., `signIn()`).
- **Assert:** We verify if the application state updated correctly (e.g., checking if the user data is correctly saved in the Zustand `useAuthStore`).

### 2. Component/Screen Tests (e.g., `DoctorLoginScreen.test.tsx`)
We use `@testing-library/react-native` to render the React Native screen in memory without needing a physical device or emulator.
- We mock child UI components that rely on heavy native modules to keep tests fast and isolated.
- We simulate user interactions using `fireEvent.press()` or by typing into inputs.
- We check if the UI updates as expected (e.g., checking if an error message text appears when a login fails).

---

## Sample Test Report

When you run `npm test`, you will see an output similar to this:

```text
> ancura@1.0.0 test
> jest

 PASS  __tests__/authService.test.ts
  signIn
    ✓ TC-SI-01 | successfully signs in a patient and sets session (15 ms)
    ✓ TC-SI-02 | successfully signs in a doctor and attaches doctorStatus (3 ms)
    ✓ TC-SI-05 | sets error in store when Supabase auth returns 400 (4 ms)
  signUp
    ✓ TC-SU-01 | successfully registers a patient and sets session (6 ms)
    ✓ TC-SU-06 | throws and sets error if Supabase signup fails (5 ms)

 PASS  __tests__/PatientAuthScreen.test.tsx
  PatientAuthScreen
    ✓ TC-PAS-01 | renders in signin mode by default (25 ms)
    ✓ TC-PAS-02 | switches to signup mode and shows extra fields (12 ms)
    ✓ TC-PAS-04 | calls signUp in signup mode (10 ms)

 PASS  __tests__/DoctorLoginScreen.test.tsx
  DoctorLoginScreen — Login Flow
    ✓ TC-DLS-L-01 | calls signIn when Login button is pressed (18 ms)
    ✓ TC-DLS-L-04 | displays error message from authStore (5 ms)

Test Suites: 3 passed, 3 total
Tests:       62 passed, 62 total
Snapshots:   0 total
Time:        1.311 s
Ran all test suites.
```

If a test fails, Jest will highlight it in red and point out the exact line in your code where the expectation was not met, making it very easy to debug and fix!
