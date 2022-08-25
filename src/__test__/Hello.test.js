// import { render, screen } from '@testing-library/react';
import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom'
import {render as lRender, screen } from '@testing-library/react'
import pretty from 'pretty'




import Hello from '../component/Hello'

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



it("should render a greeting", () => {
    act(() => {
        render(<Hello />, container);
    });

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`"<span>Hey, stranger</span>"`); /* ... gets filled automatically by jest ... */
    act(() => {
        render(<Hello name="Jenny" />, container);
    });

    expect(
pretty(container.innerHTML)).
toMatchInlineSnapshot(`"<h1>Hello, Jenny!</h1>"`); /* ... gets filled automatically by jest ... */

    act(() => {
        render(<Hello name="Margaret" />, container);
    });

    expect(
pretty(container.innerHTML)).
toMatchInlineSnapshot(`"<h1>Hello, Margaret!</h1>"`); /* ... gets filled automatically by jest ... */
});






it('renders with or without a name', () => {


    const result = lRender(<Hello />)  
    console.log(result.container.innerHTML)
    expect(screen.getByText(/Hey, /i).textContent).toBe('Hey, stranger')

    
    lRender(<Hello name='Jenny' />)
    expect(screen.getByText(/Hello, /i).textContent).toBe('Hello, Jenny!')

    lRender(<Hello name='Margaret' />)
    expect(screen.getByText(/Hello, Margaret/i).textContent).toBe('Hello, Margaret!')
    // screen.logTestingPlaygroundURL()
})

