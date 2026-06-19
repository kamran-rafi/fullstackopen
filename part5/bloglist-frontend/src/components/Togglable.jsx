import { useState } from "react"

const Togglable = props => {
    const [visiblity, setVisiblity] = useState(false)

    const toggleVisibilty = () => setVisiblity(!visiblity)

    return (
        <div>
            {
              visiblity
            ?   <div>
                    {props.children}
                    <button onClick={toggleVisibilty}>cancel</button>
                </div>
            : <button onClick={toggleVisibilty}>{props.label}</button>
            }
        </div>
    )
}

export default Togglable