import { products as staticProducts } from "@/data/products";

const DB_NAME = "shopDB";
const STORE_NAME = "products";

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

export const getProducts = async (): Promise<any[]> => {
  if (typeof window === "undefined") return staticProducts;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result.length > 0 ? req.result : staticProducts);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return staticProducts;
  }
};

export const saveProducts = async (products: any[]): Promise<void> => {
  if (typeof window === "undefined") return;
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.clear();
  products.forEach((p) => store.put(p));
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};