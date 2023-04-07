"use strict";

import React, { useRef } from 'react';
import * as bootstrap from 'bootstrap';

export function CardHeader({children}) {
  return <div className="card-header">{children}</div>;
}

export function CardBody({classNm, children}) {
  if (classNm) {
    return <div className={`card-body ${classNm}`}>{children}</div>;
  }
  return <div className="card-body">{children}</div>;
}

export function CardTitle({children}) {
  return <h5 className="card-title">{children}</h5>;
}

export function ListGroup({children}) {
  return <ul className="list-group list-group-flush">{children}</ul>
}

export function ListGroupItem({popoverTitle, popoverContent, children}) {
  if (!popoverContent) {
    return <li className="list-group-item">{children}</li>
  }
  const itemsRef = useRef(null);
  return (
    <li
      ref={(node) => {
            if (node) {
              new bootstrap.Popover(node, {
                container: 'body',
                trigger: 'hover focus',
                customClass: 'custom-popover',
                html: true,
                title: popoverTitle,
                content: popoverContent
              });
            }
          }}
      className="list-group-item"
      data-bs-toggle="popover">
        {children}
    </li>
  );
}
