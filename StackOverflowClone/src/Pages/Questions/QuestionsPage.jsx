import { Button } from 'primereact/button' 
import { Divider } from 'primereact/divider'
import Question from '../../Components/Question/Question';

export default function QuestionsPage() {
  return (
    <div className="flex flex-column gap-2 px-8 mt-2 align-items-start">
      <div className="flex w-full justify-content-between px-8 py-0">
        <h2 className="text-xl font-bold">All Questions</h2>
        <Button className="w-auto" severity="info">Ask Question +</Button>
      </div>
      <div className="flex w-full m-0 px-8 py-0">
        <p className="text-lg w-full font-normal">2000 questions</p>
        <div className="flex w-full justify-content-end m-0 p-0 p-buttonset">
          <Button text raised className="gap-1">
            <i 
              className="pi pi-clock" 
              style={{fontSize: "1rem", backgroundColor: "var(--primary-color)", color: "var(--highlight-bg)", borderRadius: '50%' }} 
            /> 
            Newest
          </Button>
          <Button text raised className="gap-1">
            <i 
              className="pi pi-question-circle" 
              style={{fontSize: "1rem", backgroundColor: "var(--primary-color)", color: "var(--highlight-bg)", borderRadius: '50%'}} 
            /> 
            Unanswered
          </Button>
          <Button text raised className="gap-1"><i className="pi pi-thumbs-up-fill" style={{fontSize: "1rem"}} /> Most votes</Button>
          <Button text raised className="gap-1"><i className="pi pi-thumbs-down-fill" style={{fontSize: "1rem"}} /> Least votes</Button>
        </div>
      </div>

      <div className="flex flex-column w-full align-items-center px-8 py-0 m-0">
        <Divider className="m-0" />
          <Question />
        <Divider className="m-0" />
      </div>
    </div>
  )
}
