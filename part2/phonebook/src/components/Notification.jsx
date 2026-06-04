const Notification = ({ notification }) => {

  if (!notification) {
    return null
  }

  const { message, error } = notification

  const style = {
    color: error ? "red" : "green"
  }

  return (
    <div className="error" style={style}>
      {message}
    </div>
  )
}

export default Notification