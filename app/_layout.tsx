import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { CartProvider } from "../app/contexts/cartContext";

export default function RootLayout() {
  //Since this is the root of the app, we make sure database is initialized here

  //Initilize the database
async function initializeDatabase(db: SQLiteDatabase) {
    try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
          );
          PRAGMA journal_mode=WAL;
        `);
        
        console.log('Database initialised')
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
  return (
    <SQLiteProvider databaseName="app.db" onInit={initializeDatabase} options={{useNewConnection:false}}>
      <CartProvider>
      <Stack />
      </CartProvider>
    </SQLiteProvider>
    
  );
}
