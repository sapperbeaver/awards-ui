import React, {lazy} from 'react';
import {ILink} from './Routes';

const Login = lazy(() => import('./Login/Login'));
const Filters = lazy(() => import('./Filter/Filters').then((v)=>({default: v.Filters})));
const Create = lazy(() => import('./People/Create').then((v)=>({default: v.Create})));
const PersonInfo = lazy(() => import('./People/PersonInfo'));
const Awards = lazy(() => import('./Awards/Awards'));
const AddAwards = lazy(() => import('./Awards/AddAwards'));
const TableList = lazy(() => import('./Table/TableList'));
const EditPeople = lazy(() => import('./People/Edit'));
export const mainLinks: ILink[] = [
  {
    exact: true,
    title: 'Login',
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    title: 'filter',
    path: '/filter',
    component: Filters,
    needAuth: true,
  },
  {
    exact: true,
    title: 'Создание',
    path: '/people/create',
    component: Create,
    needAuth: true,
    needAdmin: true,
  },
  {
    exact: true,
    title: 'Карточка человека',
    path: '/people/info/:id',
    component: PersonInfo,
    needAuth: true,
  },
  {
    exact: true,
    title: 'Награды человека',
    path: '/awards/:id',
    component: Awards,
    needAuth: true,
  },
  {
    exact: true,
    title: 'Добавление наград',
    path: '/awards/add/:id',
    component: AddAwards,
    needAuth: true,
    needAdmin: true,
  },
  {
    exact: true,
    title: 'Таблица',
    path: '/table',
    component: TableList,
    needAuth: true,
  },
  {
    exact: true,
    title: 'Редактирование человека',
    path: '/people/info/edit/:id',
    component: EditPeople,
    needAuth: true,
    needAdmin: true,
  }
];
