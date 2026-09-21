import clientPromise from "./mongodb";

const DB_NAME = "portfolio";
const COLLECTION = "portfolio";

async function getCol() {
  try {
    const client = await clientPromise;
    if(!client) return null;
    return client.db(DB_NAME).collection(COLLECTION);
  } catch { return null; }
}

async function getStore() {
  try {
    const col = await getCol();
    if (!col) return { contactMessages: [] as any[] };
    const doc = await col.findOne({ _id: "site" as any });
    return doc || { contactMessages: [] as any[] };
  } catch {
    return { contactMessages: [] as any[] };
  }
}

export const localGetContactMessages = async () => {
  const store = await getStore();
  return (store as any).contactMessages || [];
};

export const localInsertContactMessage = async (data: any) => {
  try {
    const col = await getCol();
    if (col) {
      await col.updateOne(
        { _id: "site" as any },
        { $push: { contactMessages: { ...data, created_at: new Date().toISOString() } } } as any,
        { upsert: true }
      );
    }
  } catch {}
  return true;
};

// for other pages that use local-store
export const localGetSiteData = getStore;
export default getStore;
