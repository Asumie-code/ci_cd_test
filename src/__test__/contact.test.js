import React from "react"
// import { render, unmountComponentAtNode } from 'react-dom'
// import { act } from 'react-dom/test-utils'
import {screen, act, render } from '@testing-library/react'

import Contact from '../component/Contact'
import MockedMap from '../component/Map'

jest.mock('../component/Map', () => {
    return function DummyMap(props) {
        return (
            <div data-testid='map'>
                {props.center.lat}:{props.center.long}
            </div>
        )
    }
})

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



it('should render contact information', () => {
    const center = { lat: 0, long: 0 }
    // act(() => {
    //     render(
    //         <Contact
    //             name='Joni Baez'
    //             email="test@example.com"
    //             site="http://test.com"
    //             center={center}
    //         />,
    //         container

    //     )
    // })


    render(
        <Contact
            name='Joni Baez'
            email="test@example.com"
            site="http://test.com"
            center={center}
        />
    )

    expect(
        screen.getByTestId("email").getAttribute("href")
      ).toEqual("mailto:test@example.com")
    
      expect(
        screen.getByTestId('site').getAttribute("href")
      ).toEqual("http://test.com")
    
      expect(screen.getByTestId('map').textContent).toEqual(
        "0:0"
      )
})


