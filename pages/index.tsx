
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// @ts-ignore
import {addDataToMap, receiveMapConfig } from 'kepler.gl/actions'
// @ts-ignore
import { KeplerGlSchema } from 'kepler.gl/schemas'
// @ts-ignore
import { injectComponents, ModalContainerFactory, SidePanelFactory } from 'kepler.gl/components'

import initialMapConfig from '../initialMapConfig.json'
const parsedInitialCustomMapConfig = KeplerGlSchema.parseSavedConfig(initialMapConfig)

const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ''
const NullComponent = () => null
const NullComponentFactory = () => NullComponent

// Inject custom header into Kepler.gl, replacing default
const KeplerGl = injectComponents([
  [ ModalContainerFactory, NullComponentFactory ],
  [ SidePanelFactory, NullComponentFactory ]
])

const sampleData = {
  fields: [
    { name: 'Address', format: '', type: 'timestamp' },
    { name: 'longitude', format: '', type: 'real' },
    { name: 'latitude', format: '', type: 'real' }
  ],
  rows: [
    [ "Elephant Road Aeroplane Jame Masjid, House 390, Elephant Road, New Market, Dhaka" , 90.38552664, 23.735495800000002 ],
    [ "bengal, city corporation market, nilkhet road, nilkhet, new market, dhaka", 90.35842852176165, 23.75374140575628 ],
    [ 'Sector 13, Sector 13, Uttara, Dhaka', 90.387525558472, 23.871017279476 ]
  ]
}

const sampleConfig = {
  visState: {
    filters: []
  }
}


export default function App() {

  const dispatch = useDispatch()
  // States
  const [ width, setWidth ] = useState(1200)
  const [ height, setHeight ] = useState(800)

  useEffect(() => {
    dispatch(receiveMapConfig(parsedInitialCustomMapConfig))
    dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: 'Sample Taxi Trips in New York City',
            id: 'test_trip_data'
          },
          data: sampleData
        },
        option: {
          centerMap: true,
          readOnly: true
        },
        config: sampleConfig
      })
    )
    if(width && typeof(window) !== undefined){
      setHeight(window?.innerHeight)
      setWidth(window?.innerWidth)
    }
  }, [])

  return (
    <div style={ containerStyles }>
      <KeplerGl
        id="map"
        mapboxApiAccessToken={ mapBoxToken }
        width={ width }
        height={ height }
      />
    </div>
  )
}

// JSX Styles
const containerStyles = {
  display: 'flex',
  width: '100%',
  minHeight: '100vh'
}
