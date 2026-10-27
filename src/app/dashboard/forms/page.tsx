import { getFroms } from '@/services/form.server.services';
import React from 'react';

const DashboardFormsPage = async () => {
    const forms = await getFroms();
    console.log(forms, 'response');

    return (
        <div>
            this is the dashboard forms page, where all the submitted froms by a user will be shown!
        </div>
    );
};

export default DashboardFormsPage;