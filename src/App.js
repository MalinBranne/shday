import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { RenderComments } from './components/rendercomments.js';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [redColor, setRedColor] = useState(false);

  useEffect(() => {
      axios.get('http://localhost:3030/api/comments')
        .then(response => setComments(response.data))
        .catch(err => console.log(err))
  }, []);

    const saveComment = () => {
        axios.post('http://localhost:3030/api/comments', {
            id: comments.length + 1,
            name: name,
            body: comment
        })
            .then(() => {
                setName('');
                setComment('');
                setComments([...comments, {
                    id: comments.length + 1,
                    name: name,
                    body: comment
                }])
            })
            .catch(err => alert(err))
    };

  return (
    <div className="App">

      <div className="left">
       <div />
       <div className="bottom-left">
         <button
             data-test-id="button"
             onClick={() => setRedColor(!redColor)}
         >
           CLICK ME
         </button>
         <p data-test-id="text" style={{ color: redColor ? 'red' : 'white'}}>
           Cypress is good !
         </p>
       </div>
      </div>

        <div className="middle">
            <div className="input-container">
                <input
                    data-test-id="nameInput"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" placeholder="Name"
                />
                <textarea
                    data-test-id="commentInput"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows="4" cols="50" placeholder="Comment"
                />
            </div>
            <button
                data-test-id="save_comment"
                onClick={() => saveComment()}
            >
                ADD COMMENT
            </button>
        </div>

      <div className="right">
        <div className="comments">
          <RenderComments comments={comments} showComments={showComments} />
        </div>
        <button
            data-test-id="show_comments"
            onClick={() => setShowComments(!showComments)}
        >
            {showComments ? 'HIDE COMMENTS': 'SHOW COMMENTS'}
        </button>
      </div>

    </div>
  );
}

export default App;
