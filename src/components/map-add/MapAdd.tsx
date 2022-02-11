import { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import { LocationOn, Add, Remove, FullscreenExit } from "@material-ui/icons";

import "./MapAdd.css"

interface MapProp {
    openMap: boolean
    latitude: number 
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    longitude: number 
    setLongitude: React.Dispatch<React.SetStateAction<number>>
    offsetTop: number
    closeMap: () => void
    setSelected: React.Dispatch<React.SetStateAction<boolean>>
}

const MapAdd: React.FC<MapProp> = ({ openMap, latitude , setLatitude, longitude , setLongitude, offsetTop, closeMap, setSelected }) => {
    const div = useRef<HTMLDivElement>(null !)
    const [zoom,setZoom] = useState(14)
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: zoom,
    });
    const [leftMargin, setLeftMargin] = useState(0);
    const [topMargin, setTopMargin] = useState(0);

    //get double click coordinate 
    const handleAddClick = (e: any): void => {
        if(openMap){//when map is open, edit
            const [longitude, latitude] = e.lngLat;
            setLatitude(latitude)
            setLongitude(longitude)
        }
    }

    //get top and left distance
    useEffect(() => {
        setTopMargin(div.current.offsetHeight)
        setLeftMargin(div.current.offsetLeft);
    }, [openMap])

    //set marker in center
    useEffect(() => {
        setViewport({...viewport, latitude, longitude})
    }, [latitude])

    //zoom button
    useEffect(() => {
        setViewport({...viewport, zoom})
    }, [zoom])

    //coordinate selected
    useEffect(() => {
        setSelected(true)
    }, [])


  return (
    <div style={openMap ? {marginTop: `-${(offsetTop + topMargin) - 15}px`, marginLeft: `${(leftMargin / 3)}px`} : {}} className="map-container" ref={div}>
    <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYW1pcmJhZyIsImEiOiJja3poMnpncTAwMGE0Mm9wM29kdmsxYzhvIn0.Iw0ts0YnjfB4CtEDnwjMFw"
        width={ openMap ? `100vw` : `100%` }
        height={ openMap ? `100vh` : `100%` }
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onViewportChange={(viewport: any) => setViewport(viewport)}
        onDblClick={handleAddClick}
      >
        {longitude && <Marker
            longitude={longitude}
            latitude={latitude}
            offsetLeft={-viewport.zoom*3.5}
            offsetTop={-viewport.zoom*7}
        >
            <LocationOn style={{color: `royalblue`, fontSize: viewport.zoom * 7, cursor: `pointer`}} />
        </Marker>}
        
        {openMap && (
            <div  className="map-db-click">
                <p>Click twice to change location</p>
            </div>
        )}
        {openMap && (
            <div className="map-zoom-buttons">
                <button onClick = {() => setZoom(zoom => zoom === 14 ? 14 : zoom + 1)}><Add  /></button>
                <button onClick = {() => setZoom(zoom => zoom === 1 ? 1 : zoom - 1)}><Remove /></button>
            </div>
        )}
        {openMap && (
            <div  className="map-exit-button">
                <button onClick={closeMap}><FullscreenExit  /></button>
            </div>
        )}
        
      </ReactMapGL>

    </div>
  )
}

export default MapAdd;