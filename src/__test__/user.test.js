import React from "react"
// import { render, unmountComponentAtNode } from "react-dom"
// import { act } from "react-dom/test-utils"
import {act, render, screen, waitFor} from '@testing-library/react'
import User from "../component/User"


// let container = null

// beforeEach(() => {
//     container = document.createElement('div')
//     document.body.appendChild(container)
// })


// afterEach(() => {
//     unmountComponentAtNode(container)
//     container.remove()
//     container = null
// })




it('renders user data', async () => {
    const fakeUser = { name: "Joni Baez", age: "32", address: "123, Charming Avenue" }
    jest.spyOn(global, 'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    )
    //    let ctr = null; 
    // use the async version of act to apply resolved promises 
    // await act(async () => {
    //  let {container}   = render(<User id='123'/>)
    //     ctr = container
    // })
    const {container} = render(<User id='123'/>)
    // expect(ctr.querySelector('summary').textContent).toBe(fakeUser.name)
    // expect(ctr.querySelector('strong').textContent).toBe(fakeUser.age)
    // expect(ctr.textContent).toContain(fakeUser.address)
        await waitFor(() => {
            
                expect(container.querySelector('summary').textContent).toBe(fakeUser.name)
                expect(container.querySelector('strong').textContent).toBe(fakeUser.age)
                expect(container.textContent).toContain(fakeUser.address)

        })
    









    screen.debug()
    // remove  the mock to ensure tests are completely isolated 
    global.fetch.mockRestore()
})