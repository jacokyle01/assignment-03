import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [view, setView] = useState("readProducts");

  const renderProducts = () => {
    let response = fetch("http://localhost:8081/products");
    let products = response.json();

    return (
      <div id="product-wrap">
        {products.map((product) => (
          <div id="product">
            <h2>${product.title}</h2>

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
