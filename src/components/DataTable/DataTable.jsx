const DataTable = ({ headers, data }) => {

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
                    <tr key={index}>
                        <td>
                            <input type="checkbox" name="" id="" />
                        </td>
                        {prompt.map((dataPromt, i) => (
                            <td key={i}>{dataPromt}</td>
                        ))}

                        <td>
                            <button><ion-icon name="eye-sharp"></ion-icon></button>
                            <button><ion-icon name="pencil-sharp"></ion-icon></button>
                            <button><ion-icon name="trash-sharp"></ion-icon></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default DataTable
