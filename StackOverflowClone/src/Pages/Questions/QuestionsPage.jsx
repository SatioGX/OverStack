import "./QuestionsPage.css"
import { Divider } from "primereact/divider"
import Question from "../../Components/Question/Question";

export default function QuestionsPage() {
  return (
    <div className="flex-container">
      <h2 className="flex-initial">All Questions</h2>
      <div className="questions-container">
        <Divider className="m-0" />
          <Question />
        <Divider className="m-0" />
      </div>
    </div>
  )
}
