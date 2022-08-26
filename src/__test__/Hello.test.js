// import { render, screen } from '@testing-library/react';
import React from 'react'
// import { act } from 'react-dom/test-utils'
// import { render, unmountComponentAtNode } from 'react-dom'
import { render, screen, act } from '@testing-library/react'
import pretty from 'pretty'




import Hello from '../component/Hello'

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



it("should render a greeting", () => {
    // act(() => {
    //     render(<Hello />, container);
    // });

    const { container, rerender } = render(<Hello />);

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`"<span>Hey, stranger</span>"`); /* ... gets 
    
    filled automatically by jest ... */

    // act(() => {
    //     render(<Hello name="Jenny" />, container);
    // });

    rerender(<Hello name="Jenny" />)


    expect(
        pretty(container.innerHTML)).
        toMatchInlineSnapshot(`"<h1>Hello, Jenny!</h1>"`); /* ... gets filled automatically by jest ... */

    // act(() => {
    //     render(<Hello name="Margaret" />, container);
    // });


    rerender(<Hello name="Margaret" />);

    expect(
        pretty(container.innerHTML)).
        toMatchInlineSnapshot(`"<h1>Hello, Margaret!</h1>"`); /* ... gets filled automatically by jest ... */
    screen.debug()
});






it('renders with or without a name', () => {


    const { rerender } = render(<Hello />)

    expect(screen.getByText(/Hey, /i).textContent).toBe('Hey, stranger')


    rerender(<Hello name='Jenny' />)
    expect(screen.getByText(/Hello, /i).textContent).toBe('Hello, Jenny!')

    rerender(<Hello name='Margaret' />)
    expect(screen.getByText(/Hello, Margaret/i).textContent).toBe('Hello, Margaret!')
    // screen.logTestingPlaygroundURL()
    screen.debug()
})

