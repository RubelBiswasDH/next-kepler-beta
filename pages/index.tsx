
import { useEffect } from 'react';

// @ts-ignore
// const { KeplerGl } = dynamic(() => import('kepler.gl'));
// import KeplerGl from "kepler.gl";
const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ''

import { useDispatch, useSelector } from 'react-redux'
// @ts-ignore
import {addDataToMap, receiveMapConfig } from 'kepler.gl/actions';
// @ts-ignore
import { KeplerGlSchema } from 'kepler.gl/schemas';

// @ts-ignore
import {injectComponents, ModalContainerFactory, SidePanelFactory } from 'kepler.gl/components';

import initialMapConfig from '../initialMapConfig.json'

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
const NEXT_PUBLIC_BARIKOI_MAP_API_TOKEN = process.env.NEXT_PUBLIC_BARIKOI_MAP_API_TOKEN || ''

const sampleConfig = {
  visState: {
    filters: []
  }
  //,
  // "mapStyle": {
  //   "mapStyles": {
  //     "barikoi-osm-lib": {
  //       "custom": true,
  //       "id": "barikoi-osm-lib",
  //       "label": "OSM Liberty",
  //       "url":`https://map.barikoi.com/styles/osm-liberty/style.json?key=${ NEXT_PUBLIC_BARIKOI_MAP_API_TOKEN }`,
  //     }
  //   }
  // }
};


export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(loadCustomMapStyle({ style:  {},  error: false}) )
    // dispatch(addCustomMapStyle({
    //   id: 'barikoi-osm-lib',
    //   lable: 'Barikoi OSM Liberty',
    //   url:`https://map.barikoi.com/styles/osm-liberty/style.json?key=${ NEXT_PUBLIC_BARIKOI_MAP_API_TOKEN }`,
    // }))
    
      const initialCustomMapConfig = initialMapConfig
      const parsedInitialCustomMapConfig = KeplerGlSchema.parseSavedConfig(
        initialCustomMapConfig
      )
      dispatch(receiveMapConfig(parsedInitialCustomMapConfig))
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
        // mapboxApiAccessToken="" 
        // mapStylesReplaceDefault={ false }
        // mapStyles={[
        //   {
        //     "id": 'osm-liberty',
        //     "label": 'osm-liberty',
        //     "url":`https://map.barikoi.com/styles/osm-liberty/style.json?key=${ NEXT_PUBLIC_BARIKOI_MAP_API_TOKEN }`,
        //   }
        // ]}
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
