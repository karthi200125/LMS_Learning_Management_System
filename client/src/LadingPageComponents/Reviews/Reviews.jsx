import './Reviews.scss'
import rev1 from '../../assets/rev1.jpg'
import rev3 from '../../assets/rev3.jpg'
import rev2 from '../../assets/rev2.jpg'

const Reviews = () => {

  const revs = [
    {
      img: rev1,
      name: "Jack",
      country: "london",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatem unde officiis non animi corporis quaerat amet beatae nemo, blanditiis consequatur ab excepturi! Quas, provident."
    },
    {
      img: rev2,
      name: "Kylie",
      country: "Australia",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatem unde officiis non animi corporis quaerat amet beatae nemo, blanditiis consequatur ab excepturi! Quas, provident."
    },
    {
      img: rev3,
      name: "David",
      country: "usa",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum voluptatem unde officiis non animi corporis quaerat amet beatae nemo, blanditiis consequatur ab excepturi! Quas, provident."
    }
  ]

  return (
    <div className='review'>
      <h1>From the SkillShere community</h1>
      <div className="peoples">
        {revs.map((rev) => (
          <div className="rev">
            <img src={rev.img} alt="" />
            <h1>{rev.name}</h1>
            <span>{rev.country}</span>
            <p>{rev.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews