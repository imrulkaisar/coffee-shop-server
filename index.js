// import modules
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// MongoDB
const uri =
  "mongodb+srv://imrulkaisar:0ZI8mdywF8N7xHb6@cluster0.itr0uhy.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
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
