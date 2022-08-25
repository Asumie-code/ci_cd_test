// import { render, screen } from '@testing-library/react';
import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom'




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







it('renders with or without a name', () => {
    act(() => {
        render(<Hello />, container)
    }); 
    expect(container.textContent).toBe('Hey, stranger') 

    act(() => {
        render(<Hello name='Jenny' />, container)
    }); 
    expect(container.textContent).toBe('Hello, Jenny!')

    act(() => {
        render(<Hello name='Margaret' />, container)
    }); 
    expect(container.textContent).toBe('Hello, Margaret!')

})

