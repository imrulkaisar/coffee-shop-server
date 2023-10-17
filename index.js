// import modules
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// MongoDB
const uri =
  "mongodb+srv://imrulkaisar:0ZI8mdywF8N7xHb6@cluster0.itr0uhy.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // connect the client to the MongoDB server
    await client.connect();

    // Access require database and collection
    const database = client.db("coffeeShop");
    const productsData = database.collection("productsData");

    // get all products data
    app.get("/products", async (req, res) => {
      const findResult = productsData.find();
      const result = await findResult.toArray();
      res.send(result);
    });
    // get single product data
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const findResult = productsData.find({ _id: new ObjectId(id) });
      const result = await findResult.toArray();
      res.send(result);
    });

    // add products
    app.post("/products", async (req, res) => {
      const product = req.body;
      // console.log(product);

      const result = await productsData.insertOne(product);
      res.send(result);
    });

    // update product data
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updateProduct = req.body;

      // console.log(updateProduct);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const update = {
        $set: {
          title: updateProduct.newTitle,
          chef: updateProduct.newChef,
          supplier: updateProduct.newSupplier,
          taste: updateProduct.newTaste,
          category: updateProduct.newCategory,
          price: updateProduct.newPrice,
          photo: updateProduct.newPhoto,
          details: updateProduct.newDetails,
        },
      };

      const result = await productsData.updateOne(filter, update, options);
      res.send(result);
    });

    // delete single product
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productsData.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // end
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
  }
}

run().catch(console.dir);

// Apply middlewares for the Express application
app.use(cors());
app.use(express.json());

// Default route to check server status
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// start the server and listen the on the defined port
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
