import { CiCirclePlus } from "react-icons/ci";
import { MdArrowRightAlt } from "react-icons/md";
import { RiArrowUpDownLine } from "react-icons/ri";
import Button from '../../MainPageComponents/Button/Button';
import Search from '../../MainPageComponents/Search/Search';
import './TeacherMode.scss';
import { Link } from 'react-router-dom'

const TeacherMode = () => {

  const lists = [
    {
      title: "first course",
      price: 500,
      status: 'published'
    },
    {
      title: "second course",
      price: 1000,
      status: 'publish'
    },
  ]

  return (
    <div className='teacher'>
      <div className="top">
        <Search />
        <Button title="New Course" glow={false} icon={<CiCirclePlus size={25} />} />
      </div>

      <div className="lists">
        <table className='table'>
          <thead>
            <tr>
              <th>Title <RiArrowUpDownLine /></th>
              <th>Price <RiArrowUpDownLine /></th>
              <th>Status <RiArrowUpDownLine /></th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr>
                <td>{list.title}</td>
                <td>₹ {list.price}</td>
                <td className='status'>
                  <div className='statusdiv'>
                    {list.status}
                  </div>
                </td>
                <td >
                  <Link className='editicon' to="/teachermode/create">
                    <MdArrowRightAlt size={25} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default TeacherMode