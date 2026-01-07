const DB_NAME = "exif-frame-db";
const STORE_NAME = "images";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveImage(key, value) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(value, key);
  return tx.complete;
}

export async function getImage(key) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const request = tx.objectStore(STORE_NAME).get(key);

  return new Promise((resolve) => {
    request.onsuccess = () => resolve(request.result || null);
  });
}

export async function clearImages() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).clear();
}
