require("dotenv").config();
var cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./product");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);

mongoose
	.connect(process.env.DATABASE_URL + "/productDB" || "", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

app.get("/", (req, res) => {
	res.send("Hello World");
});

//get all products
app.get("/products", async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({ message: "Server Error" });
	}
});

//get a product by id
app.get("/products/:id", async (req, res) => {
	console.log(req.body);

	const { id } = req.params;
	try {
		const product = await Product.findOne({ id: id });
		res.json(product);
	} catch (error) {
		console.error("Error fetching product with id " + id, error);
		res.status(500).json({ message: "Server Error" });
	}
});

//update product's price by id
app.put("/products/:id", async (req, res) => {
	console.log(req.body);
	const { id } = req.params;
	const { price } = req.body; //only deserialize price...

	try {
		let product = await Product.findOne({ id });
		product.price = price;
		await product.save();
		res.json(product);
	} catch (error) {
		console.error("Error fetching product with id " + id, error);
		res.status(500).json({ message: "Server Error" });
	}
});

//create a new product
app.post("/products", async (req, res) => {
	console.log(req.body);
	const { id, title, price, description, category, image, rating } = req.body;
	const product = new Product({
		id,
		title,
		price,
		description,
		category,
		image,
		rating,
	});
	await product.save();
	res.json(product);
});

//delete a product
app.delete("/products/:id", async (req, res) => {
	console.log(req.body);
	const { id } = req.params;
	try {
		await Product.deleteOne({ id });
		res.json("Deleted product with id " + id);
	} catch (error) {
		console.error("Error", error);
		res.status(500).json({ message: "Server Error" });
	}
});
