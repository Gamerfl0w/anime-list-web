import { MongoClient, ServerApiVersion  } from 'mongodb';

export default async function SaveToList(req: any, res: any) {
  if (req.method === 'POST') {
    const { email, data, img, title, details } = req.body;
    const client = new MongoClient(process.env.MONGODB_URI!, {
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
      const animeExists = await collection.countDocuments({ data: data })

      //if anime exist in user's list, dont add
      if(animeExists != 1){
        await collection.insertOne({ email, data, img, title, details });
        res.status(201).json({ message: 'Data saved' });
      } else {
        res.status(500).json("Anime already exists")
      }     
      
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}, or anime already exists` });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}