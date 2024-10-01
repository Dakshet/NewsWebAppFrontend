import React from 'react'
import "../Pages/SearchNews.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newsId } from '../redux/counter/counterSlice';

const SearchItem = ({ sNews }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(newsId(id));
        navigate("/snews");
    }

    const date = new Date(sNews.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Format time
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).replace(/\u202f/g, ' ');

    return (
        <div onClick={() => handleClick(sNews._id)} className="searchNewsParticularBox">
            <img src={sNews.coverImageURL} alt="" />
            <h5>{sNews.title.split(" ").slice(0, 5).join(" ") + "..."}</h5>
            <div className="searchNewsParticularTimeDate">
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
        </div>
    )
}

export default SearchItem
