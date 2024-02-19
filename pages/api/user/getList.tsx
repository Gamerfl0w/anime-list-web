import { MongoClient, ServerApiVersion  } from 'mongodb';

export default async function GetList(req: any, res: any) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const client = new MongoClient(process.env.MONGODB_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
    });

    try {
      await client.connect();
      const database = client.db('anime_list_web');
      const collection = database.collection('user_anime_list');
      const userList = await collection.find({ email: email }).toArray()
      res.status(201).json(userList);
      
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }

  return res.json();
}