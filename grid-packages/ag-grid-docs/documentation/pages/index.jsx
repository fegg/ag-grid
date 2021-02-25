import React from 'react';
import { Helmet } from 'react-helmet';
import { getHeaderTitle } from 'utils/page-header';

const Default = () => <div>
    <Helmet title={getHeaderTitle('Documentation')} />
    <div className="p-3">
        <h1>AG Grid: Documentation</h1>
        <div>Loading framework-specific content...</div>
    </div>
</div>;

export default Default;