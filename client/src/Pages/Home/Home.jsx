import Card from '../../MainPageComponents/Card/Card'
import Categories from '../../MainPageComponents/Categories/Categories'
import './Home.scss'
import java from '../../assets/java.jfif'

const Home = () => {

  const cards = [
    {
      id: 1,
      title: "one",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 2,
      title: "two",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 3,
      title: "three",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 4,
      title: "three",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
  ]

  return (
    <div className='home'>
      <Categories />
      <div className="cards">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default Home