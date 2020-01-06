import React from 'react';
import { Query, Mutation, Subscription } from 'react-apollo';
import { get } from 'lodash';

export const createQuery = (name, gqlQuery, queryProps = {}) => (containerProps) => {
  if (!name) {
    throw new Error('name is required');
  }
  if (!gqlQuery) {
    throw new Error('gql query is required');
  }
  const queryContainerPropsKey = `${name}Props`;
  const queryContainerProps = get(containerProps, queryContainerPropsKey, {});
  const { render } = containerProps;

  return (
    <Query
      query={gqlQuery}
      {...queryProps}
      {...queryContainerProps}
    >
      {props => render({
        ...props,
        name,
      })}
    </Query>
  );
};

export const createMutation = (name, gqlMutation, mutationProps = {}) => (containerProps) => {
  if (!name) {
    throw new Error('name is required');
  }
  if (!gqlMutation) {
    throw new Error('gql mutation is required');
  }
  const mutationContainerPropsKey = `${name}Props`;
  const mutationContainerProps = get(containerProps, mutationContainerPropsKey, {});
  const { render } = containerProps;

  return (
    <Mutation
      mutation={gqlMutation}
      {...mutationProps}
      {...mutationContainerProps}
    >
      {(mutation, result) => render({
        mutation,
        result,
        name,
      })}
    </Mutation>
  );
};

// eslint-disable-next-line
export const createSubscription = (name, gqlSubscription, subscriptionProps = {}) => (containerProps) => {
  if (!name) {
    throw new Error('name is required');
  }
  if (!gqlSubscription) {
    throw new Error('gql subscription is required');
  }
  const subscriptionContainerPropsKey = `${name}Props`;
  const subscriptionContainerProps = get(containerProps, subscriptionContainerPropsKey, {});
  const { render } = containerProps;

  return (
    <Subscription
      subscription={gqlSubscription}
      {...subscriptionProps}
      {...subscriptionContainerProps}
    >
      {props => render({
        ...props,
        name,
      })}
    </Subscription>
  );
};
