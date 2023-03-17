// @ts-ignore
// const { KeplerGl } = dynamic(() => import('kepler.gl'));
import KeplerGl from "kepler.gl";
const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ''

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
export default function App() {
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
