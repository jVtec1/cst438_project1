import { render, screen } from '@testing-library/react-native';
import SignUpScreen from '@/sign-up';
import { SQLiteProvider } from 'expo-sqlite';

describe('<SignUpScreen />', () => {
    test('Sign Up Screen Title Renders', () => {
            render(<SQLiteProvider databaseName="app.db"><SignUpScreen /></SQLiteProvider>);
    
            screen.findByText("Sign Up");
    });
    
    test('Username Input Box Renders', () => { 
        render(<SQLiteProvider databaseName="app.db"><SignUpScreen /></SQLiteProvider>);
    
        screen.findByPlaceholderText("Choose a Username");
    });

    test('Email Input Box Renders', () => { 
        render(<SQLiteProvider databaseName="app.db"><SignUpScreen /></SQLiteProvider>);
    
        screen.findByPlaceholderText("you@example.com");
    });

    test('Password Input Box Renders', () => { 
        render(<SQLiteProvider databaseName="app.db"><SignUpScreen /></SQLiteProvider>);
    
        screen.findByPlaceholderText("Create a password");
    });

    test('Confirm Password Input Box Renders', () => { 
        render(<SQLiteProvider databaseName="app.db"><SignUpScreen /></SQLiteProvider>);
    
        screen.findByPlaceholderText("Re-enter password");
    });

    test('Create Account button Renders', () => { 
        render(<SQLiteProvider databaseName="app.db"><SignUpScreen /></SQLiteProvider>);
    
        screen.findByDisplayValue("Create Account");
    });

    test('Already have account pressable Renders', () => { 
        render(<SQLiteProvider databaseName="app.db"><SignUpScreen /></SQLiteProvider>);
    
        screen.findByText("Already have an account? Click to to Login");
    });
});