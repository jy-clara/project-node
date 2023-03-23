"use strict";

import React from 'react';

export default function BOffcanvas({title, id, children}) {
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id={id} aria-labelledby={`${id}Label`}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id={`${id}Label`}>{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {children}
            </div>
        </div>
    );
}
