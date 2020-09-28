import { openDB } from 'idb';

const dbName = 'contractDB'
const storeName = 'LogisticMStore'
const version = 1

const getDB = async () => {
  return await openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      db.createObjectStore(storeName)
    }
  })
}

export const storeValue = async (key, val) => {
  const db = await getDB()

  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  const value = await store.put(val, key)
  await tx.done
  return value
}

export const getValue = async (key) => {
  const db = await getDB()

  return await db.transaction(storeName).objectStore(storeName).get(key)
}
