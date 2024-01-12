import { MdArrowRightAlt } from "react-icons/md";
import Button from '../../MainPageComponents/Button/Button';
import Card from '../../MainPageComponents/Card/Card';
import './CourseCards.scss';

const CourseCards = () => {

  const cards = [
    {
      id: 1,
      title: "one",
      img: "",
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 2,
      title: "two",
      img: "",
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 3,
      title: "three",
      img: "",
      cat: "engineering",
      chapters: 10,
    },
  ]

  return (
    <div className="cards">
      <h1 className="cardtitle">See what you can learn with us</h1>
      <div className='lpcards'>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}        
      </div>
      <Button title="All" icon={<MdArrowRightAlt size={25} />} />
    </div>
  )
}

export default CourseCards