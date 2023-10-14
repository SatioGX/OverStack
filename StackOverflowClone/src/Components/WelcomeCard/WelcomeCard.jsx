import { Button } from 'primereact/button'
import PropTypes from 'prop-types'
import './style.css'

export default function WelcomeCard({buttonText, buttonType, isOutlined, message}) {
  return (
    <div className="welcome-card-container">
        <h3>{message}</h3>
        <Button outlined={isOutlined} severity={buttonType}>{buttonText}</Button>
    </div>
  )
}

WelcomeCard.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  isOutlined: PropTypes.bool,
  message: PropTypes.string.isRequired,
}
