import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a connection to the database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const transac = jateDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = transac.objectStore("jate");

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: 0, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("data saved to the database", result.value);
};

// method that gets all the content from the database
export const getDb = async () => {
  // Create a connection to the database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const transac = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = transac.objectStore("jate");

  // Use the .get() method to get  data in the database.
  const request = store.get(0);

  // Get confirmation of the request.
  const result = await request;
  //console.log("result.value", result);
  if (result) {
    return result.value;
  } else {
    console.log("No data found in database.");
  }
};
initdb();
