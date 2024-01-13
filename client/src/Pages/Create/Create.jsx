import './Create.scss'
import Button from '../../MainPageComponents/Button/Button'
import Input from '../../MainPageComponents/Input/Input'
import { MdArrowRightAlt } from "react-icons/md";
import java from '../../assets/java.jfif'
import { CiCirclePlus } from 'react-icons/ci';
import { FaBarsProgress } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";

const Create = () => {

  const chapterlists = [
    {
      title: "outro",
      status: "published",
    },
    {
      title: "indtroduction",
      status: "published",
    },
    {
      title: "chapter1",
      status: "published",
    },
  ]

  return (
    <div className='create'>
      <div className="top">
        <h1>Course Setup</h1>
        <Button title="Publish" glow={false} classname="transparent" color="black" icon={<MdArrowRightAlt size={25} />} />
      </div>
      <div className="new">

        <div className="left">
          <div className="box">
            <Input name="Course Title" />
          </div>
          <div className="box">
            <Input name="Course Description" />
          </div>
          <div className="box courseimage">
            <img src={java} alt="" />
          </div>
        </div>

        <div className="right">
          <div className="box chapters">
            <div className="top">
              <span>Course Chapters</span>
              <Button title="Add a chapter" glow={false} classname="transparent" color="black" icon={<CiCirclePlus size={25} />} />
            </div>
            <div className="chapterslists">
              {chapterlists.map((cl) => (
                <div key={cl.title} className='chapterslist'>
                  <div className="side">
                    <FaBarsProgress size={25} />
                    <span>{cl.title}</span>
                  </div>
                  <div className="side">
                    <p>{cl.status}</p>
                    <MdOutlineEdit size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="box ">
            <Input name="Course Price" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Create