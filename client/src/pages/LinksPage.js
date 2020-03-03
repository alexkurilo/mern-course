import React, {useState, useContext, useCallback, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

import {Loader} from "../components/Loader";
import {ListLinks} from "../components/ListLinks";

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            console.log({'fetched': fetched});
            setLinks(fetched);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    return loading ? <Loader/> : <ListLinks links={links}/>;
};
