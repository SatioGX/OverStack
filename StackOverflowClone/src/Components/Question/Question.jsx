import PropTypes from 'prop-types'
import { Tag } from 'primereact/tag'
import './style.css'
import moment from 'moment/moment'

export default function Question({ questionData }) {
    const date = questionData.createdAt.toDate();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return (
        <div className="grid w-full p-0 m-0">
            <div className="col-1 flex flex-column p-0 m-0 gap-4 align-items-start">
                <h6 className="text-sm m-0">0 votes</h6>
                <h6 className="text-sm m-0">0 answers</h6>
            </div>
            <div className="col-11 flex flex-column p-0 m-0 gap-4 align-items-start">
                <h4 className="text-left font-bold m-0 p-0">{questionData.title}</h4>
                <p dangerouslySetInnerHTML={{__html: `${questionData.details.slice(0, 150)}`}} className="text-sm m-0"/>
            </div>
            <div className="col-1 p-0 m-0"></div>
            <div className="col-11 grid px-2 py-0 m-0">
                <div className="col-8 flex p-0 m-0 gap-2 justify-content-start">
                    {
                        questionData.tags && questionData.tags.map((tag, index) => {
                            return <Tag 
                                        key={index} 
                                        severity="info" 
                                        value={tag}
                                    />
                        })
                    }
                </div>
                <div className="col-4 flex p-0 m-0 gap-2 justify-content-end">
                    <img src="https://cdn.pixabay.com/photo/2018/09/14/23/28/avatar-3678347_1280.png" className="avatar w-1rem" />
                    <h6 className="text-sm font-bold">Bin Mai</h6>
                    <h6 className="text-sm">asked {moment(`${year}${month}${day}`, "YYYYMMDD").fromNow()}</h6>
                </div>
            </div>
        </div>
    )
}

Question.propTypes = {
    questionData: PropTypes.object.isRequired
}