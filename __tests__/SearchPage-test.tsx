import { render, screen } from '@testing-library/react-native';
import Search from '@/(tabs)/search';
import { SQLiteProvider } from 'expo-sqlite';

describe('<SignUpScreen />', () => {
    test('Search Page Title renders', () => {
            render(<SQLiteProvider databaseName="app.db"><Search /></SQLiteProvider>);
    
            screen.findByText("Search for Vehicles");
    });

    test('Vehicle Make dropdown renders', () => {
            render(<SQLiteProvider databaseName="app.db"><Search /></SQLiteProvider>);
    
            screen.findByPlaceholderText("Select Make");
    });

    test('Vehicle Model dropdown renders', () => {
            render(<SQLiteProvider databaseName="app.db"><Search /></SQLiteProvider>);
    
            screen.findByPlaceholderText("Select Model");
    });

    test('Search button Renders', () => { 
            render(<SQLiteProvider databaseName="app.db"><Search /></SQLiteProvider>);
        
            screen.findByDisplayValue("Search");
    });

    test('Search Vehicle Result List Renders', () => { 
            render(<SQLiteProvider databaseName="app.db"><Search /></SQLiteProvider>);
        
            screen.findByLabelText("VehicleList");
    });
});