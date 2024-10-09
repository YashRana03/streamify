/* eslint-disable react/prop-types */

// error component to display error status and message
export default function Error({error}) {
    return (
        <div className="error-container">
            <div className="error-content">
                <i className="fa-solid fa-circle-exclamation error-icon"></i>
                <h3>{error.status}</h3>
                <p>{error.message}</p>
            </div>
        </div>
    )
}