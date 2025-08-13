import React, { useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import "./App.css";

function App() {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleOpen = () => setIsOpen(true);
  // const handleClose = () => setIsOpen(false);

  // return (
  //   <div className="app">
  //     <h1>PDF Viewer</h1>

  //     <div className="buttons">
  //       <button className="icon-btn" onClick={handleOpen}>
  //         <FaEye /> Open
  //       </button>

  //       <a href="/sample.pdf" download className="icon-btn">
  //         <FaDownload /> Download
  //       </a>
  //     </div>

  //     {isOpen && (
  //       <div className="overlay" onClick={handleClose}>
  //         <div className="modal" onClick={(e) => e.stopPropagation()}>
  //           <iframe
  //             src="/sample.pdf"
  //             title="PDF"
  //             width="100%"
  //             height="100%"
  //           ></iframe>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return(
    <div>    
      <h1>Hello World</h1>
      <p>hello</p>
    </div>

    
  )
}

export default App;
