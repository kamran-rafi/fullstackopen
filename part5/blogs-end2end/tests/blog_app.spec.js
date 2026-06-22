const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset")
        await request.post("/api/users", {
            data: { name: "Kamran Malik", username: "kamran", password: "kamran123" }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText("Log in to application")
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            page.getByText("Log in to application")
            await page.getByLabel("username").fill("kamran")
            await page.getByLabel("password").fill("kamran123")
            await page.getByRole("button", { name: "login" }).click()
            await expect(page.getByText("blogs")).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            page.getByText("Log in to application")
            await page.getByLabel("username").fill("kamran")
            await page.getByLabel("password").fill("wrong123")
            await page.getByRole("button", { name: "login" }).click()
            await expect(page.getByText("invalid username or password")).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByLabel("username").fill("kamran")
            await page.getByLabel("password").fill("kamran123")
            await page.getByRole("button", { name: "login" }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole("button", { name: "create new blog" }).click()
            await page.getByLabel("title:").fill("Hello, World!")
            await page.getByLabel("author:").fill("Hamza")
            await page.getByLabel("url:").fill("https://example.com")
            await page.getByRole("button", { name: "create" }).click()
            await expect(page.getByText("a new blog Hello, World! by Hamza added")).toBeVisible()
        })
    })
})