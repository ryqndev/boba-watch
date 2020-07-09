import React, {useState, useEffect} from 'react';
import Add from './Add';
import {withRouter} from 'react-router-dom';

const Edit = ({match}) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(
            JSON.parse(
                localStorage.getItem(match.params.userid)
            )
        );
    }, [match.params.userid]);
    useEffect(() => {
        console.log('edit data', data);
    }, [data]);
    return (
        <Add
            pageTitle='Edit a Purchase'
            buttonTitle='UPDATE'
            editData={data}
        />
    );
}

export default withRouter(Edit);