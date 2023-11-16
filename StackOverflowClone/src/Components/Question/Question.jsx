import { Tag } from 'primereact/tag';        
import './style.css'
        

export default function Question() {
  return (
    <div className="grid p-2">
        <div className="col-1 flex flex-column p-1 gap-4">
            <h6 className='text-sm m-0'>0 votes</h6>
            <h6 className='text-sm m-0'>0 answers</h6>
        </div>
        <div className="col-11 flex flex-column p-1 gap-4 align-items-start">
            <h4 className="text-left m-0">How to make a table in reactjs</h4>
            <p className="text-sm m-0">i had ESM on MakerDao on april 2023 and i need to know how to access my vault information. i recieved mip65 dashboard and a vault loan but i dont know the usage. my admin account genera...</p>
        </div>
        <div className='col-1'></div>
        <div className="col-11 grid p-0 m-0">
            <div className="col-8 flex p-0 m-0 gap-2 justify-content-start">
                <Tag severity="info" value="Reactjs"></Tag>
                <Tag severity="info" value="HTML"></Tag>
                <Tag severity="info" value="CSS"></Tag>
            </div>
            <div className="col-4 flex py-0 m-0 gap-2">
                <img src="https://cdn.pixabay.com/photo/2018/09/14/23/28/avatar-3678347_1280.png" className="avatar w-1rem" />
                <h6 className="text-sm font-bold">Bin Mai</h6>
                <h6 className="text-sm">asked 6 hours ago</h6>
            </div>
        </div>
    </div>
  )
}
