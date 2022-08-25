import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import User from "../component/User"


let container = null

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})


afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
})




it('renders user data', async () => {
    const fakeUser = { name: "Joni Baez", age: "32", address: "123, Charming Avenue" }
    jest.spyOn(global, 'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    )

    // use the async version of act to apply resolved promises 
    await act(async () => {
        render(<User id='123'/>, container)
    })

    expect(container.querySelector('summary').textContent).toBe(fakeUser.name)
    expect(container.querySelector('strong').textContent).toBe(fakeUser.age)
    expect(container.textContent).toContain(fakeUser.address)

    // remove  the mock to ensure tests are completely isolated 
    global.fetch.mockRestore()
})