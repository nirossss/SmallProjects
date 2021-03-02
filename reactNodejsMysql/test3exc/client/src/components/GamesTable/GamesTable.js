import React, { useContext, useEffect, useState } from 'react';
import './GamesTable.css';
import GamesDataContext from '../contexts/GamesDataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GamesTable = (props) => {
    const { isGame, setIsGame } = useContext(GamesDataContext)

    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [commentRefresh, setCommentRefresh] = useState(1)

    const { category, date, id, scoreA, scoreB, teamA, teamB } = props

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/comments/${id}`);
                const { success, data } = await res.json();
                if (success) {
                    setComments(data);
                }

            } catch (e) {
                alert(e)
            }
        })();
    }, [id, commentRefresh]);

    const renderComments = () => {
        return comments.map(comment => <li key={comment.id}><p className="date-div">{new Date(comment.created).toLocaleString()}: </p> {comment.comment}</li >)
    }

    const handleSendComment = async () => {
        const res = await fetch('http://localhost:3001/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: commentText,
                id: id
            })
        });

        const { success } = await res.json();

        if (success) {
            setCommentRefresh(commentRefresh + 1)
            setCommentText('')
        } else {
            setCommentText('Somthing went wrong. Please try again')
        }
    }

    return (
        <div className='container'>
            <div className='wrapper'>
                <p><strong>{category}</strong></p>
                <p className="date-div">{new Date(date).toLocaleString()}</p>
                <p className="teams-scores">{teamA}({scoreA})</p>
                <p className="teams-scores">{teamB}({scoreB})</p>
                <div className="iconContainer">
                    <div className="starTooltip" >follow</div>
                    <FontAwesomeIcon icon={["far", "star"]} size="lg" className="starIcon" />
                    <FontAwesomeIcon icon="star" size="lg" className="starIcon" />
                    <FontAwesomeIcon icon={["fas", "pencil-alt"]} size="lg" />
                    <FontAwesomeIcon icon={["fas", "trash-alt"]} size="lg" />
                </div>
            </div>
            {isGame[0] || <button onClick={() => setIsGame([true, id])}>Info</button>}
            {isGame[0] &&
                <div>
                    <div>
                        <h3>add comment</h3>
                        <textarea type="textarea" rows="4" cols="50" maxLength="200" onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                        <button onClick={handleSendComment}>send comment</button>
                    </div>
                    <div>
                        <h3>Comments</h3>
                        <ol>{renderComments()}</ol>
                    </div>
                </div>
            }
        </div>
    )
}

export default GamesTable;
