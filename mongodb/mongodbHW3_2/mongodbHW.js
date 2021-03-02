const { MongoClient, ObjectId } = require('mongodb');

const uri = "";
const client = new MongoClient(uri, { useUnifiedTopology: true });


const run = async () => {
    await client.connect();

    const db = client.db("homework_16_8_20");
    const collection = db.collection("comments");

    // const postid6 = await collection.find({ postId: 6 }).toArray()
    // console.log(postid6);

    // const postid7count = await collection.find({ postId: 7 }).count()
    // console.log(postid7count);

    // const postid1and2 = await collection.find({ $or: [{ postId: 1 }, { postId: 2 }] }).toArray()
    // console.log(postid1and2);

    // const del = await collection.deleteMany({ postId: 8 });
    // console.log(del.deletedCount);

    // const emailemilia = await collection.find({ email: "Claudia@emilia.ca" }).project({ id: 1, _id: 0 }).toArray()
    // console.log(emailemilia);

    // const update = await collection.updateOne({ email: "Claudia@emilia.ca" }, { $set: { email: "new@new.new" } });
    // console.log(update.updatedCount);

    // const update = await collection.updateOne({ id: 11 }, { $set: { body: "new" } });
    // console.log(update.updatedCount);

    // const findelike = await collection.find({ body: /aliquam/ }).count()
    // console.log(findelike);

    const groupcount = await collection.aggregate([
        { $group: { _id: "$postId", count: { $sum: 1 } } }
    ]).toArray()
    console.log(groupcount);



    client.close();
}

run();