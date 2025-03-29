// import { useState ,useEffect} from 'react';
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import './App.css';

// function App() {
//   const [code, secode] = useState(` function sum(){
//   return 1+1;
// }`)

//   useEffect(()  => {
//     prism.highlightAll()
//   }, [code])

//   return (
//     <>
//     <main>
//       <div className="left">
//         <div className="code">
//           <Editor
//              value={code}
//              onValueChange={(code) => setCode(code)}
//              highlight={code => prism.highlight(code,prism.languages.javascript, "javascript")}
//              padding={10}
//              style={{
//               fontFamily: '"Fira code", "Fira Mono", monospace',
//               fontSize: 12,
//               border: "1px solid #ddd",
//               borderRadius: "5px",
//               height: "100%",
//               width: "100%"
//              }}
//              />
//         </div>
//         <div className="review">Review</div>
//       </div>
//       <div className="right"></div>
//     </main>
//     </>
//   )
// }



// export default App


import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import axios from 'axios';
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

 const [review,setReview] = useState(``)


  useEffect(() => {
    prism.highlightAll();
  }, [code]); // Add code as dependency for effect.

 async function reviewCode() {
     const response = await axios.post('https://ai-codereview-backend.onrender.com/ai/get-review', {code})

     setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="main-div">
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
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 18,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
         
          <div  onClick={reviewCode}
           className="review">Review</div>
        </div>
        <div className="right">
          <Markdown
          
          rehypePlugins={[rehypeHighlight]}

          >{review}</Markdown>
        </div>
        </div>
      </main>
    </>
  );
}

export default App;
