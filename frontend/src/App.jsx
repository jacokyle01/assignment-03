import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";

function App() {
	// addProduct, updatePrice, deleteProduct, studentInfo
	const [view, setView] = useState("studentInfo");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [dataF, setDataF] = useState({});
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/products");
				const data = await response.json();
				console.log(data);
				setProducts(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
		console.log(products);
	}, []); // Empty dependency array to run the effect only once when the component mounts

	const renderProducts = () => {
		console.log(products);
		return (
			<div id="product-wrap">
				{products.map((product) => (
					<div key={product.id} id="product">
						<img src={product.image} />
						<h1>{product.title}</h1>
						<h2>{product.price}</h2>
						<h2>{product.category}</h2>
						<p>{product.description}</p>
						<p>{product.rating}</p>
					</div>
				))}
			</div>
		);
	};

	const createProduct = async (data) => {
		fetch("http://localhost:3001/products", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				id: data.id,
				title: `"${data.title}"`,
				price: data.price,
				description: `"${data.description}"`,
				category: data.category,
				image: data.image,
			}),
		});
	};

	const renderAddProduct = () => {
		const onSubmit = (data) => {
			console.log({ data });
			setDataF(data);
			createProduct(data);
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
							placeholder="Product Category"
						>
							<option value="">Select Product Rating</option>
							<option value="menCloth">Mens Clothing</option>
							<option value="womenCloth">Womens Clothing</option>
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
							<option value="menShirt">Mens Slim Fit T-Shirt</option>
							<option value="menJacket">Mens Jacket</option>
							<option value="womenShirt">Womens Shirt</option>
							<option value="womenJacket">Womens Raincoat</option>
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

	const renderStudentInfo = () => {
		return (
			<div id="student-wrapper">
				<div className="student-info">
					<div className="student">
						<img
							src="/images/PicOfSimon.jpg"
							alt="Picture of Simon"
							style={{
								maxWidth: "100%",
								maxHeight: "400px",
								width: "auto",
								height: "auto",
							}}
						/>
						<h2>Simon Berberich</h2>
						<h3>Software Engineer</h3>
						<h3>simonb@iastate.edu</h3>
						<p>
							Simon is a junior Iowa State student majoring in Software
							Engineering and minoring in Cyber Security Engineering. He enjoys
							watching movies, reading books, walking in nature, playing soccer,
							and hitting the town with friends.
						</p>
					</div>
					<div className="student">
						<img
							src="/images/PicOfKyle.png"
							alt="Picture of Kyle"
							style={{
								maxWidth: "100%",
								maxHeight: "400px",
								width: "auto",
								height: "auto",
							}}
						/>
						<h2>Kyle Jacobson</h2>
						<h3>Software Engineer</h3>
						<h3>jacokyle@iastate.edu</h3>
						<p>
							Kyle Jacobson is a sophomore Iowa State student majoring in
							Software Engineering. He is proficient in java, javascript, css,
							html, and typescript. He enjoys coding, playing tennis, and
							playing chess in his free time. He was raised in his hometown of
							Savage, MN.
						</p>
					</div>
				</div>
				<div>
					<h1>Class Information</h1>
					<h2>ComS 319 Construction of User Interfaces</h2>
					<h3>April 22 2024</h3>
					<h3>Professor Ali Jannesari</h3>
					<p>
						For this assignment, Simon and Kyle are constructing a full-stack
						web application utilizing MongoDB, Express, React and Nodejs. We
						will be hosting a catalog of products for users to browse through.
						Users will also have the ability to create their own products,
						update the prices of products, and delete products. These
						funcionalities will be done using GET, POST, PUT, and DELETE request
						methods.
					</p>
				</div>
			</div>
		);
	};

	const renderNavbar = () => {
		return (
			<Container fluid className="p-0">
				<Row className="bg-success text-white">
					<Col className="d-flex justify-content-center align-items-center py-3">
						<Button
							variant="light"
							className="mx-2"
							onClick={() => setView("addProduct")}
						>
							Create Product
						</Button>
						<Button
							variant="light"
							className="mx-2"
							onClick={() => setView("readProducts")}
						>
							See Products
						</Button>
						<Button
							variant="light"
							className="mx-2"
							onClick={() => setView("updatePrice")}
						>
							Update Price
						</Button>
						<Button
							variant="light"
							className="mx-2"
							onClick={() => setView("deleteProduct")}
						>
							Delete Product
						</Button>
						<Button
							variant="light"
							className="mx-2"
							onClick={() => setView("studentInfo")}
						>
							Meet the Authors
						</Button>
					</Col>
				</Row>
			</Container>
		);
	};

	const renderView = () => {
		console.log(view);
		switch (view) {
			case "addProduct":
				return renderAddProduct();
			case "readProducts":
				return renderProducts();
			case "updatePrice":
				// return updatePriceView();
				break;
			case "deleteProduct":
				// return deleteProductView();
				break;
			case "studentInfo":
				return (
					<Row>
						<Col>{renderStudentInfo()}</Col>
					</Row>
				);
			default:
				return;
		}
	};

	// return <div id="main">{renderView()}</div>;
	return (
		<>
			{renderNavbar()}
			<div id="main">{renderView()}</div>
		</>
	);
}

export default App;
