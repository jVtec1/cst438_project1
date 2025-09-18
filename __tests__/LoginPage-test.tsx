import { render, screen } from '@testing-library/react-native';

import Index from '../app/index';
import { SQLiteProvider } from 'expo-sqlite';

describe('<LoginScreen />', () => { // 'describe' is a testing suite, runs all tests inside
    test('Login Screen Title Renders', () => { // Individual Test
        render(<SQLiteProvider databaseName="app.db"><Index /></SQLiteProvider>);

        screen.findByText("Login");
    });

    test('Sign in Button Renders', () => { // Individual Test 
        render(<SQLiteProvider databaseName="app.db"><Index /></SQLiteProvider>); //renders the Login Screen using the exported function 'Index()'

        screen.findByDisplayValue("Sign in");
    });

    test('Sign up Button Renders', () => { // Individual Test
        render(<SQLiteProvider databaseName="app.db"><Index /></SQLiteProvider>);

        screen.findByDisplayValue("Sign up");
    });

    test('Username Input Box Renders', () => { // Individual Test
        render(<SQLiteProvider databaseName="app.db"><Index /></SQLiteProvider>);

        screen.findByPlaceholderText("Enter username");
    });

    test('Password Input Box Renders', () => { // Individual Test
        render(<SQLiteProvider databaseName="app.db"><Index /></SQLiteProvider>);

        screen.findByPlaceholderText("Enter password");
    });

    test('UserList Renders', () => { // Individual Test
        render(<SQLiteProvider databaseName="app.db"><Index /></SQLiteProvider>);

        screen.findByLabelText("UserList");
    });
});
