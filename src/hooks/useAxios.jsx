import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${sessionStorage.token}`
                    }
                };
                const response = await axios.get(url, config);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useAxios;

