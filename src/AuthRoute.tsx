import React, {FC, useContext} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import {StoreContext} from './StoreContext';

interface OwnProps {
  needAuth?: boolean;
  needAdmin?: boolean;
  defaultTo?: string;
}

type Props = OwnProps & RouteProps;
export const AuthRoute: FC<Props> = ({needAuth, needAdmin, exact, path, component, defaultTo}) => {
  const ctx = useContext(StoreContext) as any;
  console.log('AuthRoute', ctx)
  return ((!needAuth || !!ctx.token) && (!needAdmin || !!ctx.permission)) ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to={defaultTo || '/'} />
  );
};

