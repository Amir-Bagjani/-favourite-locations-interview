import React, { useState } from "react";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { LocationData } from "./LocationList";
//styles
import "./LocationList.css"
//type
interface TableDataProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const data: LocationData[] = [
  {id: 1 ,title: `loerem sdffsdsdfsd`, type: `sdfl; ;l l;k`, description: `gssdsfsadassdsdassdasdasdasdasdasdasdasdasdasdasas`, coordinate: 54654*54656},
  {id: 2 ,title: `loerem sdffsdsdfsd`, type: `sdfl; ;l l;k`, description: `gssdsfsadassdsdassdasdasdasdasdasdasdasdasdasdasas`, coordinate: 54654*54656},
  {id: 3 ,title: `loerem sdffsdsdfsd`, type: `sdfl; ;l l;k`, description: `gssdsfsadassdsdassdasdasdasdasdasdasdasdasdasdasas`, coordinate: 54654*54656},
  {id: 4 ,title: `loerem sdffsdsdfsd`, type: `sdfl; ;l l;k`, description: `gssdsfsadassdsdassdasdasdasdasdasdasdasdasdasdasas`, coordinate: 54654*54656},
]

const TableData: React.FC<TableDataProps> = ({ setShowModal }) => {
    const [showModall, setShowModall] = useState(false)

    const handleDelete = (id: string | number) => {
      console.log(id);
      setShowModal(true)
    }
    const handleEdit = (id: string | number) => {
      console.log(id);
    }

  return (
    <>
      {data.map(i => (
        <tr key={i.id}>
          <td>{i.title}</td>
          <td>{i.type}</td>
          <td>{i.description.slice(0, 20)}...</td>
          <td className="locationlist-action">
            <span className="icon-button" onClick={() => handleDelete(i.id)}> <DeleteOutline /></span>
            <span className="icon-button" onClick={() => handleEdit(i.id)}><EditOutlined /></span>
          </td>
        </tr>
      ))}
    </>
  );
};
export default TableData;
