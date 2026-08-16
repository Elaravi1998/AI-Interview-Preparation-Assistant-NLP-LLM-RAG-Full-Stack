import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const mockCollections: Record<string, any[]> = {
  users: [],
  resumes: [],
  jobDescriptions: [],
  analyses: [],
  skillGaps: [],
  interviewSessions: [],
  questions: [],
  answers: [],
  reports: []
};

export async function connectToDatabase(): Promise<{ client: MongoClient | null; db: Db | null; isMock: boolean }> {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes("username:password")) {
    console.warn("MONGODB_URI is missing or unconfigured. Operating with serverless in-memory mock store.");
    return { client: null, db: null, isMock: true };
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb, isMock: false };
  }

  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });

    await client.connect();
    const db = client.db();

    cachedClient = client;
    cachedDb = db;

    console.log("Successfully connected to MongoDB Atlas");
    return { client, db, isMock: false };
  } catch (error) {
    console.error("MongoDB Atlas Connection Error:", error);
    return { client: null, db: null, isMock: true };
  }
}

export async function getCollection(collectionName: string) {
  const { db, isMock } = await connectToDatabase();
  if (isMock || !db) {
    if (!mockCollections[collectionName]) {
      mockCollections[collectionName] = [];
    }
    return {
      isMock: true,
      insertOne: async (doc: any) => {
        const item = { ...doc, _id: doc._id || Date.now().toString() };
        mockCollections[collectionName].push(item);
        return { insertedId: item._id };
      },
      findOne: async (query: any) => {
        return mockCollections[collectionName].find(item => {
          return Object.keys(query).every(key => item[key] === query[key]);
        }) || null;
      },
      find: (query: any = {}) => {
        const items = mockCollections[collectionName].filter(item => {
          return Object.keys(query).every(key => item[key] === query[key]);
        });
        return {
          toArray: async () => items,
          sort: () => ({ toArray: async () => items }),
          limit: () => ({ toArray: async () => items })
        };
      },
      updateOne: async (query: any, update: any) => {
        const item = mockCollections[collectionName].find(i => {
          return Object.keys(query).every(key => i[key] === query[key]);
        });
        if (item && update.$set) {
          Object.assign(item, update.$set);
        }
        return { matchedCount: item ? 1 : 0 };
      }
    };
  }
  return {
    isMock: false,
    rawCollection: db.collection(collectionName),
    insertOne: async (doc: any) => db.collection(collectionName).insertOne(doc),
    findOne: async (query: any) => db.collection(collectionName).findOne(query),
    find: (query: any = {}) => db.collection(collectionName).find(query),
    updateOne: async (query: any, update: any) => db.collection(collectionName).updateOne(query, update)
  };
}
