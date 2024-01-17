import { memo } from 'react';
import { IoBookOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Card.scss';


const Card = ({ card }) => {

    return (
        <Link className='card' to={`/course/${card._id}`} state={card}>
            <img src={card.imageUrl} alt="" />
            <div className='content'>
                <h1>{card.title}</h1>
                <p className='carddesc'>{card.description}</p>
                <div className='chapter'>
                    <IoBookOutline size={20} className="book" />
                    <span>{card?.chapters?.length} Chapters</span>
                </div>
                <div className="progress">
                    progress
                </div>
            </div>
        </Link>
    )
}

export default memo(Card)