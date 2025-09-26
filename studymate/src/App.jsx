
import React, { useState } from "react";
import { FaDownload, FaEye, FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./App.css";
import Top from "./Top.jsx";

const data = {
  DAA: {
    "Chapter 1": [
      { name: "daa", path: "/daa/unit1/daa.pdf" },
      { name: "notes.pdf", path: "daa/unit1/notes.pdf" },
      { name: "recurrence_relation.pdf", path: "daa/unit1/recurrence_relation.pdf" }
    ],
    "Chapter 2": [
      { name: "bruteforce.pdf", path: "/daa/unit2/bruteforce.pdf" },
      { name: "dijkstraalgo.pdf", path: "/daa/unit2/dijkstraalgo.pdf" },
      { name: "huffmanencoding.pdf", path: "/daa/unit2/huffmanencoding.pdf" },
      { name: "kurutsuba.pdf", path: "/daa/unit2/kurutsuba.pdf" },
      { name: "obst.pdf", path: "/daa/unit2/obst.pdf" },
      { name: "strassenmatrix.pdf", path: "/daa/unit2/strassenmatrix.pdf" }
    ]
  },
  SE :{
    "Chapter 1" : [
      {name : "Unit1" , path : "/se/UNIT 1- SE.pdf"},
      
     
    ],
    "Chapter 2":[
      {name : "Unit2" , path : "/se/Unit-2_SE-Material.pdf"}
    ]
  },
   OS :{
    "Chapter" : [
      {name : "Unit 1 & 2 " , path : "/os/OS Notes.pdf"},
      {name : "Bankers Algorithm" , path : "/os/Bankers.pdf"},
     
    ],
    
  },
   DL : {
    "Chapter" : [
      {name : "Unit 1 & 2 " , path : "/DL/DL UNIT 1 & 2 HANDWRITTEN NOTES.pdf"},
      {name : "Backward Propagation" , path : "/DL/AMG DEEP LEARNING BACKPROPOGATION.pdf"},
     
    ],
    
  },
  CN: {
    "Chapter" : [
      {name : "Unit 1 & 2 " , path : "/CN/212CSE3302_Unit 1 Notes_compressed.pdf"},
    ],
    
  }
  ,
  QUESTION_PAPERS : {
    "QUESTION_PAPERS" : [
      {
        name : "QUESTION_PAPERS1", path: "/QP/qp1.pdf"
      },
      {name : "QUESTION_PAPERS2", path : "/QP/qp2.pdf"}
    ]
  }
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOpen = (file) => {
    setCurrentFile(file);
    setIsOpen(true);
    setLoading(true); // Show loader
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentFile(null);
    setLoading(false);
  };

  const toggleChapter = (subject, chapter) => {
    setOpenChapters((prev) => ({
      ...prev,
      [`${subject}-${chapter}`]: !prev[`${subject}-${chapter}`]
    }));
  };

  return (
    <div className="app">
      <Top/>
      <h1>PDF Viewer <br /> <br /> <span>BTECH CSE - 3rd YEAR</span></h1>

      {Object.entries(data).map(([subject, chapters]) => (
        <div className="subject-card" key={subject}>
          <h2>{subject}</h2>

          {Object.entries(chapters).map(([chapter, files]) => {
            const isExpanded = openChapters[`${subject}-${chapter}`] || false;

            return (
              <div className="chapter" key={chapter}>
                <div
                  className="chapter-header"
                  onClick={() => toggleChapter(subject, chapter)}
                >
                  <span className="chapter-title">
                    {isExpanded ? <FaChevronDown /> : <FaChevronRight />} {chapter}
                  </span>
                </div>

                {isExpanded && (
                  <div className="file-list">
                    {files.map((file, index) => (
                      <div className="file-row" key={index}>
                        <span className="file-name">{file.name}</span>
                        <div className="file-actions">
                          <a href={file.path} download title="Download">
                            <FaDownload />
                          </a>
                          <button
                            onClick={() => handleOpen(file.path)}
                            title="View"
                          >
                            <FaEye />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {isOpen && (
        <div className="overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>✖</button>

            {/* Loader */}
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}

            <iframe
              src={currentFile}
              title="PDF"
              width="100%"
              height="100%"
              onLoad={() => setLoading(false)} // Hide loader when loaded
              style={{ display: loading ? "none" : "block" }}
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
}
