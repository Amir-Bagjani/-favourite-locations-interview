import { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { LocationOn, Add, Remove, FullscreenExit } from "@material-ui/icons";

import "./MapEdit.css"

interface MapProp {
    openMap: boolean
    latitude: number | undefined
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    longitude: number | undefined
    setLongitude: React.Dispatch<React.SetStateAction<number>>
    offsetTop: number
    closeMap: () => void
    title: string
    description: string
}

const MapEdit: React.FC<MapProp> = ({ openMap, latitude , setLatitude, longitude , setLongitude, offsetTop, closeMap, description, title }) => {
    const div = useRef<HTMLDivElement>(null !)
    const [zoom,setZoom] = useState(6)
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: zoom,
    });
    const [leftMargin, setLeftMargin] = useState(0);
    const [topMargin, setTopMargin] = useState(0);
    const [showPopup, setShowPopup] = useState(true);

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
        if(latitude){
            setViewport({...viewport, latitude, longitude})
        }
    }, [latitude])

    //zoom button
    useEffect(() => {
        setViewport({...viewport, zoom})
    }, [zoom])


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
            longitude={longitude !}
            latitude={latitude !}
            offsetLeft={-viewport.zoom*3.5}
            offsetTop={-viewport.zoom*7}
        >
            <LocationOn
             style={{color: `royalblue`, fontSize: viewport.zoom * 7, cursor: `pointer`}}
             onClick={() => setShowPopup(true)}
             />
        </Marker>}
        {openMap && showPopup && (
            <Popup
            longitude={longitude !}
            latitude={latitude !}
            offsetTop={-35}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
            anchor="bottom"
            >
                <div className="map-popup">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </Popup>
        )}
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

export default MapEdit;