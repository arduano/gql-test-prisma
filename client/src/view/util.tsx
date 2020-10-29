import React from 'react';
import { QueryResult } from 'react-apollo';

export function checkQuery<T, V>(query: QueryResult<T, V>, children: (data: T) => any) {
  if (query.loading || !query.data) {
    return <h1>Loading!</h1>;
  }
  if (query.error) {
    return <h1>Error!</h1>;
  }
  return children(query.data!);
}
