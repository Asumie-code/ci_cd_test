import Reactt from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import {render as lrender, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import Toggle from '../component/Toggle'

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



it('changes value when clicked', () => {
    const onChange = jest.fn()
    // act(() => {
    //     render(<Toggle onChange={onChange} />, container)
    // })

    lrender(<Toggle onChange={onChange} />)

    // get a hold of the button element, and trigger some clicks on it 
    // const button  = document.querySelector('[data-testid=toggle]')
    const button = screen.getByTestId('toggle')
    
    expect(button.innerHTML).toBe('Turn on')

    // act(() => {
    //     button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    // })
    fireEvent(button, new MouseEvent('click', {bubbles: true}))

    expect(onChange).toHaveBeenCalledTimes(1); 
    expect(button.innerHTML).toBe('Turn off')

    // act(() => {
    //     for (let i = 0; i < 5; i++) {
    //         button.dispatchEvent(new MouseEvent('click', {bubbles: true}))

    //     }
    // })

    for (let i = 0; i < 5; i++) {
        fireEvent(button, new MouseEvent('click', {bubbles: true}))

    }
    expect(onChange).toHaveBeenCalledTimes(6)
    expect(button.innerHTML).toBe('Turn on')
    
    screen.debug()
})


