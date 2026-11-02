import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import EditorModule from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

// CHANGE 1: Backend ka URL dynamic kar diya (Deploy ke liye)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Vite mein import object aa sakta hai, isliye default nikal rahe hain
const Editor = EditorModule.default || EditorModule

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setReview("Generating review... Please wait.") // Loading message
    try {
      // CHANGE 2: URL mein API_URL use kiya aur timeout 60 seconds kar diya
      const response = await axios.post(`${API_URL}/ai/get-review`, { code }, { timeout: 60000 })
      
      const reviewData = response.data.review || response.data;
      setReview(String(reviewData))
      
    } catch (error) {
      console.error("Review fetch failed:", error)
      // YAHAN CHANGE KIYA HAI: Better error handling
      if (error.code === 'ECONNABORTED') {
        setReview("Request timed out. The backend took too long to respond. Please try again.");
      } else if (error.message.includes('Network Error')) {
        setReview("Network error. The backend might be waking up. Please wait 30-50 seconds and try again.");
      } else {
        setReview("Error fetching review: " + (error.response?.data?.error || error.message));
      }
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App