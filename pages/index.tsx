
import { useEffect } from 'react';

// @ts-ignore
// const { KeplerGl } = dynamic(() => import('kepler.gl'));
// import KeplerGl from "kepler.gl";
const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ''

import { useDispatch, useSelector } from 'react-redux'
// @ts-ignore
import {addDataToMap} from 'kepler.gl/actions';

// @ts-ignore
import {injectComponents, ModalContainerFactory, SidePanelFactory } from 'kepler.gl/components';

const NullComponent = () => null
const NullComponentFactory = () => NullComponent

// Inject custom header into Kepler.gl, replacing default
const KeplerGl = injectComponents([
  [ ModalContainerFactory, NullComponentFactory ],
  [ SidePanelFactory, NullComponentFactory ]
]);


const mapStyles = [
  {
    id: 'my_dark_map',
    label: 'Dark Streets 9',
    url: 'mapbox://styles/mapbox/dark-v9',
    layerGroups: [
      {
        slug: 'label',
        filter: ({id}: any) => id.match(/(?=(label|place-|poi-))/),
        defaultVisibility: true
      },
      {
        // adding this will keep the 3d building option
        slug: '3d building',
        filter: () => false,
        defaultVisibility: false
      }
    ]
  }
];


const sampleTripData = {
  fields: [
    {name: 'Address', format: '', type: 'timestamp'},
    {name: 'longitude', format: '', type: 'real'},
    {name: 'latitude', format: '', type: 'real'}
  ],
  rows: [
    ["Elephant Road Aeroplane Jame Masjid, House 390, Elephant Road, New Market, Dhaka" , 90.38552664, 23.735495800000002],
    ["bengal, city corporation market, nilkhet road, nilkhet, new market, dhaka", 90.35842852176165, 23.75374140575628],
    ['Sector 13, Sector 13, Uttara, Dhaka', 90.387525558472, 23.871017279476]
  ]
};

const sampleConfig = {
  visState: {
    filters: []
  }
};



export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: 'Sample Taxi Trips in New York City',
            id: 'test_trip_data'
          },
          data: sampleTripData
        },
        option: {
          centerMap: true,
          readOnly: true
        },
        config: sampleConfig
      })
    );
  
  }, [ ])
  return (
    <div style={ containerStyles }>
      <KeplerGl
        id="map"
        mapboxApiAccessToken={ mapBoxToken }
        width={ 1200 }
        height={ 700 }
      />
    </div>
  );
}

// JSX Styles
const containerStyles = {
  display: 'flex',
  width: '100%',
  minHeight: '100vh'
}
