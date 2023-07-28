// Import styles
import './dataTable.scss';

const DataTable = ({ headers, data, handleRun, handleEdit, handleDelete }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" name="" id="" />
                    </th>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th> </th>
                </tr>
            </thead>

            <tbody>

                {data.map((fact, index) => (
                    <tr key={index}>
                        <td>
                            <input type="checkbox" name="" id="" />
                        </td>
                        <td>{fact[fact.name ? "name" : "first_name"]}</td>
                        <td>{fact[(fact.type ? "type" : "email")]}</td>
                        <td>{fact.tags ? fact.tags : `${fact.verified}`}</td>

                        <td className='crud'>
                            <button onClick={() => {handleRun && handleRun(fact._id)}}><ion-icon name="eye-sharp"></ion-icon></button>
                            <button onClick={() => handleEdit(fact._id)}><ion-icon name="pencil-sharp"></ion-icon></button>
                            <button onClick={() => handleDelete(fact._id)}><ion-icon name="trash-sharp"></ion-icon></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default DataTable
