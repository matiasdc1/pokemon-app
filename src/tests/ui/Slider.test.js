import { render, screen, fireEvent } from '@testing-library/react'
import Slider from '../../components/ui/Slider'

test('when no initial value, value should initiate with 50', () => {
  render(<Slider text="placeholder" min={0} max={100} onChange={() => {}} />)
  expect(screen.getByRole('slider')).toHaveValue('50')
})

test('when slide value changes, it should reflect the change', () => {
  render(<Slider text="placeholder" min={0} max={100} onChange={() => {}} />)
  fireEvent.change(screen.getByRole('slider'), { target: { value: 20 } })
  expect(screen.getByRole('slider')).toHaveValue('20')
})

test('slider value should not be more than max', () => {
  render(<Slider text="placeholder" min={0} max={100} onChange={() => {}} />)
  fireEvent.change(screen.getByRole('slider'), { target: { value: 105 } })
  expect(screen.getByRole('slider')).toHaveValue('100')
})

test('slider value should not be less than min', () => {
  render(<Slider text="placeholder" min={0} max={100} onChange={() => {}} />)
  fireEvent.change(screen.getByRole('slider'), { target: { value: -10 } })
  expect(screen.getByRole('slider')).toHaveValue('0')
})
