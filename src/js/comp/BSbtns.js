"use strict";

import React from 'react';

export function BSbtnPrimary({onClick, onClickIns, children}) {
    return (
        <button type="button" className="btn btn-primary btn-sm" onClick={(e) => onClick(...onClickIns, e)}>
            {children}
        </button>)
}

export function BSbtnOutLinePrimary({onClick, onClickIns, children}) {
    return (
        <button type="button" className="btn btn-outline-primary btn-sm me-1" onClick={(e) => onClick(...onClickIns, e)}>
            {children}
        </button>)
}