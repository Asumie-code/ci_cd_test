import React from "react"
// import { render, unmountComponentAtNode } from "react-dom"
// import { act } from "react-dom/test-utils"
import { fireEvent ,act ,screen ,render } from "@testing-library/react"



import Card from "../component/card"



// let container = null

beforeEach(() => {
    // container = document.createElement('div')
    // document.body.appendChild(container)
    jest.useFakeTimers()
})


afterEach(() => {
    // unmountComponentAtNode(container)
    // container.remove()
    // container = null
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
})


it('should select null after timing out', () => {
    const onSelect = jest.fn()
    // act(() => {
    //     render(<Card onSelect={onSelect} />, container)
    // })

    render(<Card onSelect={onSelect} />)   

    // move ahead in time by 100ms 
    act(() => {
        jest.advanceTimersByTime(100)
    })
    expect(onSelect).not.toHaveBeenCalled()

    // and then move ahead by 5 seconds
    act(() => {
        jest.advanceTimersByTime(5000)

    })
    expect(onSelect).toHaveBeenCalledWith(null)
})


it('should cleanup on bien removed', () => {
    const onSelect = jest.fn()
    // act(() => {
    //     render(<Card onSelect={onSelect} />)
    // })
    
    const {unmount} = render(<Card onSelect={onSelect} />)
    act(() => {
        jest.advanceTimersByTime(100)
    })

    expect(onSelect).not.toHaveBeenCalled()

    // unmount the app 
    // act(() => {
    //     render(null, container)
    // })
    unmount()
    
    act(() => {
        jest.advanceTimersByTime(5000);
    });
    screen.debug()
    expect(onSelect).not.toHaveBeenCalled();

})


it('should accept selections', () => {
    const onSelect = jest.fn()
    // act(()  => {
    //     render(<Card onSelect={onSelect} />, container)
    // })
    
    render(<Card onSelect={onSelect} />)

    // act(() => {
    //     container
    //     .querySelector('[data-testid="2"]')
    //     .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // })

    const card = screen.getByTestId('2')
    fireEvent.click(card, {bubbles: true})


    expect(onSelect).toHaveBeenCalledWith(2)
})




