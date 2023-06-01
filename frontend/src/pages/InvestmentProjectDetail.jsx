import React from 'react';
import {useParams} from 'react-router-dom';

const InvestmentProjectDetail = () => {
    let { projectId } = useParams()
    console.log(projectId)
    return (
        <div>
            HUI
        </div>
    );
};

export default InvestmentProjectDetail;