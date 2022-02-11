import React, { useContext, useState } from "react";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
//styles
import "./LocationList.css"
import { LocationContext, LocationData } from "../../context/LocationContext";
import axios from "axios";
//type
interface TableDataProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> ;
  setLocation: React.Dispatch<React.SetStateAction<LocationData>>;
}



const TableData: React.FC<TableDataProps> = ({ setShowModal, setLocation }) => {
  const { state, dispatch } = useContext(LocationContext)

    const handleDelete = async(id: string | number) => {
      await axios.delete(`http://localhost:3030/locations/${id}`)
      dispatch({type: "DELETE_LOCATION", payload: id})
    }

    const handleEdit = (location: LocationData) => {
      setShowModal(true)
      setLocation(location)
    }

  return (
    <>
      {state.locations.map(i => (
        <tr key={i.id}>
          <td title={i.title}>{i.title}</td>
          <td title={i.type}>{i.type}</td>
          <td title={i.description}>{i.description.slice(0, 25)}{i.description.length > 25 && `...` }</td>
          <td className="locationlist-action">
            <span title="Delete" className="icon-button" onClick={() => handleDelete(i.id)}> <DeleteOutline /></span>
            <span title="Edit" className="icon-button" onClick={() => handleEdit(i)}><EditOutlined /></span>
          </td>
        </tr>
      ))}
    </>
  );
};
export default TableData;
