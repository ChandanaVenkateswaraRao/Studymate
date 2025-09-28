import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaDownload, FaEye, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Top from "./Top.jsx";
import { FcGoogle } from "react-icons/fc"; // Import Google icon

// Your data object remains the same
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
  },
  QUESTION_PAPERS : {
    "QUESTION_PAPERS" : [
      { name : "QUESTION_PAPERS1", path: "/QP/qp1.pdf" },
      { name : "QUESTION_PAPERS2", path : "/QP/qp2.pdf" }
    ]
  }
};


export default function App() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      if (loggedInUser) {
        setUser(loggedInUser);
        toast.success(`Welcome, ${loggedInUser.displayName}!`);
      }
    } catch (error) {
      toast.error(error.message); // Display error message using toast
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // ========= If user not logged in, show login screen =========
  if (!user) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <div className="card shadow p-4 p-md-5 rounded-lg text-center" style={{ maxWidth: '450px', width: '100%' }}>
          <h1 className="mb-3 text-primary">📚 PDF Viewer</h1>
          <p className="lead text-muted mb-4">Please sign in with your <b>@klu.ac.in</b> email to continue.</p>
          <button className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center" onClick={handleLogin}>
            <FcGoogle className="me-2" /> Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // ========= If logged in, show app =========
  return (
    <div className="app">
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> Removed from here */}
      {/* <Top /> */}
      <div className="app-header">
        <h1>PDF Viewer <br /> <br /> <span>BTECH CSE - 3rd YEAR</span></h1>
        <div className="user-info-card">
          <img src={user.photoURL} alt="profile" className="profile-pic" />
          <div className="user-details">
            <span className="user-name">{user.displayName}</span>
            <span className="user-email">{user.email}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* === Subject/Chapter Rendering (No changes needed here) === */}
      {Object.entries(data).map(([subject, chapters]) => (
        <div className="subject-card" key={subject}>
          <h2>{subject}</h2>
          {Object.entries(chapters).map(([chapter, files]) => {
            const isExpanded = openChapters[`${subject}-${chapter}`] || false;
            return (
              <div className="chapter" key={chapter}>
                <div
                  className="chapter-header"
                  onClick={() =>
                    setOpenChapters((prev) => ({
                      ...prev,
                      [`${subject}-${chapter}`]: !prev[`${subject}-${chapter}`],
                    }))
                  }
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
                            onClick={() => {
                              setCurrentFile(file.path);
                              setIsOpen(true);
                              setLoading(true);
                            }}
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

      {/* === Modal Viewer (No changes needed here) === */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
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
              onLoad={() => setLoading(false)}
              style={{ display: loading ? "none" : "block" }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}