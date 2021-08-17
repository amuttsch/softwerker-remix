import type { LinksFunction, LoaderFunction } from 'remix';

import stylesUrl from '../styles/index.css';

import React from 'react';
import { Outlet } from 'react-router-dom';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return { message: 'this is awesome 😎' };
};

export default function Home() {
  return (
    <>
      List of stuff
      <Outlet />
    </>
  );
}
