import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> creates the blog with right data", async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText("title:")
    const authorInput = screen.getByLabelText("author:")
    const urlInput = screen.getByLabelText("url:")

    const createButton = screen.getByText("create")

    await user.type(titleInput, 'Hello, World!')
    await user.type(authorInput, 'Hamza Malik')
    await user.type(urlInput, 'https://kamran.app')

    await user.click(createButton) 
    
    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Hello, World!')
    expect(createBlog.mock.calls[0][0].author).toBe('Hamza Malik')
    expect(createBlog.mock.calls[0][0].url).toBe('https://kamran.app')
})