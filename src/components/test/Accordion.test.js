/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import Accordion from '../Accordion'
import type { Props } from '../Accordion'

const title = 'test title'
const text = 'test text'

describe('Loading', () => {
  it('should render correctly', () => {
    const props: Props = { title, text }
    const component = shallow(<Accordion {...props} />)
    expect(component).toMatchSnapshot()
  })
})