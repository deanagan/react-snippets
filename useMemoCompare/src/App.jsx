import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { isEqual, uniqueId } from 'lodash'
import ColorDropDown from './ColorDropdown'
import { ColoredHeader } from './StyledComponents'


const colorChoices = [
  {uniqueId: 1, name: 'red'},
  {uniqueId: 2, name: 'green'},
  {uniqueId: 3, name: 'blue'},
]

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [color, setColor] = useState('blue')
  const colorAndCount = {color, count}
  const changeCurrentColor = useCallback((c) => {
    setColor(c)
  }, [color])

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <ColorComponent colorAndCount={colorAndCount}/>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
        <button type="button" onClick={() => setCount2((count) => count + 1)}>
          count2 is: {count2}
        </button>
        <ColoredHeader color={color}>Current Color: {color}</ColoredHeader>
        <ColorDropDown colorChoices={colorChoices} currentColor={color} setToColor={changeCurrentColor}/>
      </header>
    </div>
  )
}

export default App

const useMemoObjCompare = (value) => {
  const prevRef = useRef()
  const previous = prevRef.current
  const isObjEqual = isEqual(previous, value)
  useEffect(() => {
    if (!isObjEqual) {
      prevRef.current = value;
    }
  })
  return isObjEqual ? previous : value
};

const colorToCountry = [
  {color: 'blue', country: 'America'},
  {color: 'red', country: 'China'},
  {color: 'green', country: 'Australia'}
]
function ColorComponent({colorAndCount}) {
  const [country, setCountry] = useState('')

  const colorAndCountMemoized = useMemoObjCompare(colorAndCount)
  useEffect(() => {
    const result = colorToCountry.find(d => d.color === colorAndCount.color)
    setCountry(result.country)
  }, [colorAndCountMemoized])
  return (
    <div>
      Country: {country}
    </div>

  )
}