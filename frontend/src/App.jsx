import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar, Nav, NavDropdown, Card, Container, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import MyNavbar from './Navbar';
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
  const [add, addView] = useState({});

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
	}, [add]); // Empty dependency array to run the effect only once when the component mounts

	const renderProducts = () => {
		console.log(products);

    return (
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="custom-card">
              <Card.Img variant="top" src={product.image} style={{ height: '50%' }}  />
              <Card.Body className="custom-card-body">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> {product.price}
                  <br />
                  <strong>Category:</strong> {product.category}
                  <br />
                  <strong>Product ID:</strong> {product.id}
                  <br />
                  {product.description}
                  <br />
                  <strong>Rating:</strong> {product.rating}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
	};

	const createProduct = async (data) => {
		fetch("http://localhost:3001/products", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				title: data.title,
				price: data.price,
				description: data.description,
				category: data.category,
				image: data.image,
        rating: 2.5
			}),
		});
	};

	const renderAddProduct = () => {
		const onSubmit = (data) => {
			console.log({ data });
			setDataF(data);
			createProduct(data);
      const response = fetch("http://localhost:3001/products");
      addView(response);
      setView("readProducts");
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
							<option value="">Select Category</option>
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
							<option value="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg">Mens Slim Fit T-Shirt</option>
              <option value="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg">Backpack</option>
              <option value="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg">Bracelet</option>
              <option value="https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg">Earrings</option>
              <option value="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg">Ring</option>
              <option value="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg">USB Drive</option>
              <option value="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg">Laptop</option>
							<option value="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg">Mens Jacket</option>
							<option value="https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg">Womens Shirt</option>
							<option value="https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg">Womens Raincoat</option>
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
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>MERN</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setView("addProduct")}>Add Product</Nav.Link>
              <Nav.Link onClick={() => setView("readProducts")}>Read Products</Nav.Link>
              <Nav.Link onClick={() => setView("updatePrice")}>Update Price</Nav.Link>
              <Nav.Link onClick={() => setView("deleteProduct")}>Delete Product</Nav.Link>
              <Nav.Link onClick={() => setView("studentInfo")}>Meet the Authors</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

		// return (
		// 	<Container fluid className="p-0">
		// 		<Row className="bg-success text-white">
		// 			<Col className="d-flex justify-content-center align-items-center py-3">
		// 				<Button
		// 					variant="light"
		// 					className="mx-2"
		// 					onClick={() => setView("addProduct")}
		// 				>
		// 					Create Product
		// 				</Button>
		// 				<Button
		// 					variant="light"
		// 					className="mx-2"
		// 					onClick={() => setView("readProducts")}
		// 				>
		// 					See Products
		// 				</Button>
		// 				<Button
		// 					variant="light"
		// 					className="mx-2"
		// 					onClick={() => setView("updatePrice")}
		// 				>
		// 					Update Price
		// 				</Button>
		// 				<Button
		// 					variant="light"
		// 					className="mx-2"
		// 					onClick={() => setView("deleteProduct")}
		// 				>
		// 					Delete Product
		// 				</Button>
		// 				<Button
		// 					variant="light"
		// 					className="mx-2"
		// 					onClick={() => setView("studentInfo")}
		// 				>
		// 					Meet the Authors
		// 				</Button>
		// 			</Col>
		// 		</Row>
		// 	</Container>
		// );
	};

  const updatePriceView2 = () => {
    const onSubmit = async (formdata) => {
      console.log(formdata);
			console.log( dataF.id );

      const response = await fetch(`http://localhost:3001/products/${dataF.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          price: formdata.price
        })
      });

      console.log(response);
      addView(response);
      setView("readProducts");
    };
      return (
        <div>
          <Card style={{ height: '100%' }}>
            <Card.Img variant="top" src={dataF.image} style={{ height: '50%' }}  />
            <Card.Body style={{ height: '50%' }}>
              <Card.Title>{dataF.title}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> {dataF.price}
                <br />
                <strong>Category:</strong> {dataF.category}
                <br />
                <strong>Product ID:</strong> {dataF.id}
                  <br />
                {dataF.description}
                <br />
                <strong>Rating:</strong> {dataF.rating}
              </Card.Text>
            </Card.Body>
          </Card>
          <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="form-group">
              <input
                {...register("price", { required: true, pattern: /^\d+\.\d{2}$/ })}
                placeholder="New Price"
              />
              {errors.title && <p>Valid price is required.</p>}
            </div>
            <button type="submit" className="button-add-product">
              Update Price
            </button>
        </form>
        </div>
      )
  };

  const updatePriceView = () => {

    const onSubmit = async (formdata) => {
			console.log({ formdata });

      const response = await fetch(`http://localhost:3001/products/${formdata.id}`, {
        method: "GET"
      });

      const product = await response.json();
      console.log({ product });
      setDataF(product);
      setView("updatePrice2");
		};

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="form-group">
              <input
                {...register("id", { required: true })}
                placeholder="Product ID"
              />
              {errors.title && <p>Product id is required.</p>}
            </div>
            <button type="submit" className="button-add-product">
              Find Product
            </button>
        </form>
    )
  };

  const deleteProductView2 = () => {
    const onSubmit = async () => {
			console.log( dataF.id );

      const response = await fetch(`http://localhost:3001/products/${dataF.id}`, {
        method: "DELETE"
      });
      console.log(response);
      addView(response);
      setView("readProducts");
    };
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
          <Card style={{ height: '500px', width: '400px' }}>
            <Card.Img variant="top" src={dataF.image} style={{ height: '60%' }}  />
            <Card.Body style={{ height: '50%' }}>
              <Card.Title>{dataF.title}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> {dataF.price}
                <br />
                <strong>Category:</strong> {dataF.category}
                <br />
                <strong>Product ID:</strong> {dataF.id}
                  <br />
                {dataF.description}
                <br />
                <strong>Rating:</strong> {dataF.rating}
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <button type="submit" className="button-add-product">
              Confirm Deletion
            </button>
          </form>
        </div>
      )
  };

  const deleteProductView = () => {

    const onSubmit = async (formdata) => {
			console.log({ formdata });

      const response = await fetch(`http://localhost:3001/products/${formdata.id}`, {
        method: "GET"
      });

      const product = await response.json();
      console.log({ product });
      setDataF(product);
      setView("deleteProduct2");
		};

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="form-group">
              <input
                {...register("id", { required: true })}
                placeholder="Product ID"
              />
              {errors.title && <p>Product id is required.</p>}
            </div>
            <button type="submit" className="button-add-product">
              Delete Product
            </button>
        </form>
    )
  };

	const renderView = () => {
		console.log(view);
		switch (view) {
			case "addProduct":
				return renderAddProduct();
			case "readProducts":
				return renderProducts();
			case "updatePrice":
				return updatePriceView();
      case "updatePrice2":
        return updatePriceView2();
			case "deleteProduct":
				 return deleteProductView();
      case "deleteProduct2":
        return deleteProductView2(); 
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
