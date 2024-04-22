import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
	// addProduct, updatePrice, deleteProduct, studentInfo
	const [view, setView] = useState("readProducts");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [dataF, setDataF] = useState({});


  const fetchProducts = async () => {
    return fetch("http://localhost:3001/products").then(data => data.json);
  }

	const renderProducts = () => {
    const products = fetchProducts();
    console.log(products);
		return (
			<div id="product-wrap">
				{products.map((product) => (
					<div id="product">
						<img src={product.image} />
						<h1>${product.title}</h1>
						<h2>${product.price}</h2>
						<p>${product.description}</p>
					</div>
				))}
				;
			</div>
		);
	};

	const readProductsView = () => {
		return (
			<div id="main">
				<header className="header">
					<button className="button" onClick={() => setView("addProduct")}>
						{" "}
						Create Product
					</button>
					<button className="button" onClick={() => setView("updatePrice")}>
						{" "}
						Update Price
					</button>
					<button className="button" onClick={() => setView("deleteProduct")}>
						{" "}
						Delete Product
					</button>
					<button className="button" onClick={() => setView("studentInfo")}>
						{" "}
						Meet the Authors
					</button>
				</header>
				<main>{renderProducts()}</main>
			</div>
		);
	};

	const renderAddProduct = () => {
		const onSubmit = (data) => {
			console.log({ data });
			setDataF(data);
		};

		return (
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
					<div className="form-group">
						<input
							{...register("title", { required: true })}
							placeholder="Product Title"
						/>
						{errors.title && <p>Product title is required.</p>}
					</div>
					<div className="form-group">
						<input
							{...register("price", {
								required: true,
								pattern: /^\d+\.\d{2}$/,
							})}
							placeholder="Product Price"
						/>
						{errors.price && <p>Valid product price is required.</p>}
					</div>
					<div className="form-group">
						<input
							{...register("description", { required: true })}
							placeholder="Product Description"
						/>
						{errors.description && <p>Product description is required.</p>}
					</div>
					<div className="form-group">
						<select
							{...register("category", { required: true })}
							placeholder="Product Rating"
						>
							<option value="">Select Product Rating</option>
							<option value="menCloth">Men's Clothing</option>
							<option value="womenCloth">Women's Clothing</option>
							<option value="jewelry">Jewelry</option>
							<option value="elec">Electronics</option>
						</select>
						{errors.rating && <p>Product rating is required.</p>}
					</div>
					<div className="form-group">
						<select
							{...register("image", { required: true })}
							placeholder="Product Image"
						>
							<option value="">Select Product Image</option>
							<option value="menShirt">Men's Slim Fit T-Shirt</option>
							<option value="menJacket">Men's Jacket</option>
							<option value="womenShirt">Women's Shirt</option>
							<option value="womenJacket">Women's Raincoat</option>
						</select>
						{errors.rating && <p>Product rating is required.</p>}
					</div>
					<button type="submit" className="button-add-product">
						Create Product
					</button>
				</form>
			</div>
		);
	};

	const addProductView = () => {
		return (
			<div id="main">
				<header className="header">
					<button className="button" onClick={() => setView("readProducts")}>
						{" "}
						See Products
					</button>
					<button className="button" onClick={() => setView("updatePrice")}>
						{" "}
						Update Price
					</button>
					<button className="button" onClick={() => setView("deleteProduct")}>
						{" "}
						Delete Product
					</button>
					<button className="button" onClick={() => setView("studentInfo")}>
						{" "}
						Meet the Authors
					</button>
				</header>
				<main>{renderAddProduct()}</main>
			</div>
		);
	};

	const renderView = () => {
		switch (view) {
			case "addProduct":
				return addProductView();
			case "readProducts":
				return readProductsView();
			case "updatePrice":
				// return updatePriceView();
				break;
			case "deleteProduct":
				// return deleteProductView();
				break;
			case "studentInfo":
				// return studentInfoView();
				break;
			default:
				return;
		}
	};

	return <div id="main">{renderView()}</div>;
}

export default App;
