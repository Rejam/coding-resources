import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import './Main.scss';
import { Intro, Callback } from '.';
import {
  ResourceC,
  NewResourceC,
  EditResourceC,
  ResourceListC,
} from '../Containers';

const defaultTags = [
  'OOP',
  'ES5',
  'Sorts',
  'Big O',
  'Refactoring',
  'Map',
  'Learning to Code',
  'Free Sites',
  'Paid Sites',
  'Getting Hired',
];

const Main = ({ categories }) => (
  <div className="main-content">
    <Switch>
      <Route
        exact
        path="/resources"
        component={ResourceListC}
      />
      <Route
        path="/submit-resource"
        render={props => (
          <NewResourceC
            {...props}
            categories={categories}
            defaultTags={defaultTags}
          />
        )}
      />
      <Route
        exact
        path="/resources/edit/:id"
        render={props => (
          <EditResourceC
            {...props}
            categories={categories}
            defaultTags={defaultTags}
          />
        )}
      />
      <Route
        exact
        path="/resources/:id"
        component={ResourceC}
      />
      <Route
        exact
        path="/resources/c/:cat"
        component={ResourceListC}
      />
      <Route path="/auth/callback" component={Callback} />
      <Route path="/" component={Intro} />
    </Switch>
  </div>
);

Main.propTypes = { categories: PropTypes.array };

export default Main;
