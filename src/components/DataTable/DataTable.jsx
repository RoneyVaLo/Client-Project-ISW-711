// Import styles
import './dataTable.scss';

const DataTable = ({ headers, data, ids, handleRun, handleEdit, handleDelete }) => {

    const getIdRow = (e) => {
        const trId = e.target.closest('tr').getAttribute('id');
        return trId;
    };

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
                {data.map((prompt, index) => (
                    <tr key={index} id={ids[index]}>
                        <td>
                            <input type="checkbox" name="" id="" />
                        </td>
                        {prompt.map((dataPromt, i) => (
                            <td key={i}>{dataPromt}</td>
                        ))}

                        <td className='crud'>
                            <button onClick={(e) => handleRun(getIdRow(e))}><ion-icon name="eye-sharp"></ion-icon></button>
                            <button onClick={(e) => handleEdit(getIdRow(e))}><ion-icon name="pencil-sharp"></ion-icon></button>
                            <button onClick={(e) => handleDelete(getIdRow(e))}><ion-icon name="trash-sharp"></ion-icon></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default DataTable
