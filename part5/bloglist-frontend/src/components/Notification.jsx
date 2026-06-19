const Notification = ({ notification }) => {

    if(!notification) return null

    const { message, error } = notification

    const style = {
        color: error ? "red" : "green"
    }

    return (
        <div style={style} className="notification">
            {message}
        </div>
    )
}

export default Notification