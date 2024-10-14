import React from 'react';
import { formatISODate } from '../utils/dateConverter';

export default function ClientCard({ client }) {
  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{client.name}</h5>
            <a className='btn btn-light' href={`/client/${client.id}`}>
              View
            </a>
          </div>
          <p className='small'>
            Email: <strong>{client.email}</strong>
          </p>
          <p className='small'>
            Phone: <strong>{client.phone}</strong>
          </p>
          <p className='small'>
            Created At: <strong>{formatISODate(client.createdAt)}</strong>
          </p>
          <p className='small'>
            Updated At: <strong>{formatISODate(client.updatedAt)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
