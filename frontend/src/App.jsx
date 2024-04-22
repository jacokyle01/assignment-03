import { useState } from 'react'
import { useForm } from 'react-hook-form'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [view, setView] = useState("readProducts");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dataF, setDataF] = useState({});
  
  const renderProducts = () => {
    let response = fetch("http://localhost:8081/products");
    let products = response.json();

    return (
      <div id="product-wrap">
        {products.map((product) => (
          <div id="product">
            <img src={product.image}/>
            <h1>${product.title}</h1>
            <h2>${product.price}</h2>
            <p>${product.description}</p>
          </div>
        ))};
      </div>
    )
  };

  const readProductsView = () => {
    return (
			<div id="main">
				<header className='header'>
					<button 
						className="button" 
						onClick={() => setView("addProduct")}>
						{" "}
						Create Product
					</button>
          <button 
						className="button" 
						onClick={() => setView("updatePrice")}>
						{" "}
						Update Price
					</button>
          <button 
						className="button" 
						onClick={() => setView("deleteProduct")}>
						{" "}
						Delete Product
					</button>
          <button 
						className="button" 
						onClick={() => setView("studentInfo")}>
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
              <input {...register("title", { required: true })} placeholder="Product Title" />
              {errors.title && <p>Product title is required.</p>}
            </div>
            <div className="form-group">
              <input {...register("price", { required: true, pattern: /^\d+\.\d{2}$/ })} placeholder="Product Price" />
              {errors.price && <p>Valid product price is required.</p>}
            </div>
            <div className="form-group">
              <input {...register("description", { required: true })} placeholder="Product Description" />
              {errors.description && <p>Product description is required.</p>}
            </div>
            <div className="form-group">
              <select {...register("category", { required: true })} placeholder="Product Rating">
                <option value="">Select Product Rating</option>
                <option value="menCloth">Men's Clothing</option>
                <option value="womenCloth">Women's Clothing</option>
                <option value="jewelry">Jewelry</option>
                <option value="elec">Electronics</option>
              </select>
              {errors.rating && <p>Product rating is required.</p>}
            </div>
            <div className="form-group">
              <select {...register("image", { required: true })} placeholder="Product Image">
                <option value="">Select Product Image</option>
                <option value="menShirt">Men's Slim Fit T-Shirt</option>
                <option value="menJacket">Men's Jacket</option>
                <option value="womenShirt">Women's Shirt</option>
                <option value="womenJacket">Women's Raincoat</option>
              </select>
              {errors.rating && <p>Product rating is required.</p>}
            </div>
            <button type="submit" className="button-add-product">Create Product</button>
          </form>
        </div>
      )
  };

  const addProductView = () => {
    return (
			<div id="main">
				<header className='header'>
					<button 
						className="button" 
						onClick={() => setView("readProducts")}>
						{" "}
						See Products
					</button>
          <button 
						className="button" 
						onClick={() => setView("updatePrice")}>
						{" "}
						Update Price
					</button>
          <button 
						className="button" 
						onClick={() => setView("deleteProduct")}>
						{" "}
						Delete Product
					</button>
          <button 
						className="button" 
						onClick={() => setView("studentInfo")}>
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
				return updatePriceView();
      case "deleteProduct":
        return deleteProductView();
      case "studentInfo":
        return studentInfoView();
			default:
				return;
		}
	};

  return <div id="main">{renderView()}</div>;

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
}

export default App
