import React, {FC, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {AuthRoute} from './AuthRoute';

export interface ILink {
    exact: boolean;
    title: string;
    path: string;
    component: React.LazyExoticComponent<any>;
    icon?: React.ReactNode;
    menuComponent?: React.ReactNode;
    needAuth?: boolean;
    needAdmin?: boolean;
  }

interface OwnProps {
  links: ILink[];
  defaultTo: string;
  forbiddenTo?: string;
}

type Props = OwnProps;

export const Routes: FC<Props> = ({links, defaultTo, forbiddenTo}) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Switch>
        {links.map((link, index) => (
          <AuthRoute
            needAuth={link.needAuth}
            needAdmin={link.needAdmin}
            defaultTo={forbiddenTo ? forbiddenTo : defaultTo}
            key={index}
            exact={link.exact}
            path={link.path}
            component={link.component}
          />
        ))}
        <Route exact={false} path="/" render={() => <Redirect to={defaultTo} />} />
      </Switch>
    </Suspense>
  );
};
