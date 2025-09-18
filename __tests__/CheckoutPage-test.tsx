import { render, screen } from '@testing-library/react-native';
import { SQLiteProvider } from 'expo-sqlite';
import Checkout from '@/(tabs)/checkout';

describe('<CheckOutScreen />', () => { // beginning of test suite

    test('Checkout Page Renders', () => { // single test
       
        render(<SQLiteProvider databaseName="app.db"><Checkout /></SQLiteProvider>);
        screen.findByText("My Cart"); // checking if title of page rendering

    });

})