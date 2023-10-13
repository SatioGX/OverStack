import Navbar from '../../Components/Navbar/Navbar'
import WelcomeCard from '../../Components/WelcomeCard/WelcomeCard'
import './style.css'

export default function HomePage() {
  return (
    <div>
        <Navbar />
        <div className="card-container">
            <WelcomeCard buttonText="Join Our Community" buttonType="primary" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"/>
            <WelcomeCard buttonText="Search Contents" buttonType="info" isOutlined={true} message="Habitant morbi tristique senectus et netus et malesuada fames. Laoreet non curabitur gravida arcu." />
        </div>
    </div>
  )
}
