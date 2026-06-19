import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("initially renders title and author", () => {
    const blog = {
      title: "Hello, World!",
      author: "Kamran Rafi",
      url: "https://kamran.app",
      likes: "10",
    };

    const { container } = render(<Blog blog={blog} />);

    const title = screen.getByText("Hello, World!");
    const author = screen.getByText("Kamran Rafi");
    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");

    expect(title).toBeDefined();
    expect(author).toBeDefined();

    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("shows url and likes when button is clicked", async () => {
    const blog = {
      title: "Hello, World!",
      author: "Kamran Rafi",
      url: "https://kamran.app",
      likes: "10",
    };

    const user = userEvent.setup();

    render(<Blog blog={blog} />)

    const button = screen.getByText("show");

    await user.click(button);

    const url = screen.getByText("https://kamran.app");
    const likes = screen.getByText("10");

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("Clicking on like button twice calls the function twice", async ()=>{
    const blog = {
      title: "Hello, World!",
      author: "Kamran Rafi",
      url: "https://kamran.app",
      likes: "10",
    }

    const mockHandler = vi.fn()

    const user = userEvent.setup()
    render(<Blog blog={blog} handleLike={mockHandler}/>)
    const button = screen.getByText("show");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
