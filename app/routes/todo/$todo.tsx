import type { LinksFunction, LoaderFunction } from 'remix';
import { useRouteData } from 'remix';

import stylesUrl from '../../styles/index.css';

import React from 'react';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ params }) => {
  return { id: params.todo };
};

export default function Home() {
  const todo = useRouteData();

  return <>Todo id: {todo.id}</>;
}
