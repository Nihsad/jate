import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  //open connection to the database
  const db = await openDB('jate', 1);

  //create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readwrite');

  // open the desired object store
  const store = tx.objectStory('jate');

  //add or update the content in the database
  const request = store.put({ id: 1, content: content });

  //get confirmation of the request
  const result = await request;
  console.log('data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //open a connection to the database
  const db = await openDB('jate', 1);

  //oreate a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readonly');

  //open the desired object store
  const store = tx.objectStore('jate');

  //oet all data in the database
  const request = store.getAll();

  //oet confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();