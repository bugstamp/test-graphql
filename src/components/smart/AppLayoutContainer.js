import { adopt } from 'react-adopt';
import { concat } from 'lodash';

import { createMutation, createQuery, createSubscription } from '../../apollo/utils';
import gql from '../../gql';

const {
  GET_ME,
  CHAT_CREATED_SUBSCRIPTION,
  SIGN_OUT,
  GET_MY_CHATS,
  CHECK_SESSION_EXPIRATION,
  USER_ACTIVITY_SUBSCRIPTION,
} = gql;

const getMe = createQuery('getMe', GET_ME);
const checkSessionExpiration = createQuery('checkSessionExpiration', CHECK_SESSION_EXPIRATION);
const chatCreatedSubscription = createSubscription('chatCreatedSubscription', CHAT_CREATED_SUBSCRIPTION, {
  onSubscriptionData(props) {
    const { client, subscriptionData: { data: { chatCreated } } } = props;
    const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS });
    const { contact, chat } = chatCreated;

    client.writeQuery({
      query: GET_MY_CHATS,
      data: {
        myContacts: concat(myContacts, contact),
        myChats: concat(myChats, chat),
      },
    });
  },
});
const userActivitySubscription = createSubscription('userActivitySubscription', USER_ACTIVITY_SUBSCRIPTION, {
  onSubscriptionData(props) {
    console.log(props);
    // const { client, subscriptionData: { data: { chatCreated } } } = props;
    // const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS });
    // const { contact, chat } = chatCreated;
    //
    // client.writeQuery({
    //   query: GET_MY_CHATS,
    //   data: {
    //     myContacts: concat(myContacts, contact),
    //     myChats: concat(myChats, chat),
    //   },
    // });
  },
});
const signOut = createMutation('signOut', SIGN_OUT);

const AppLayoutContainer = adopt({
  chatCreatedSubscription,
  userActivitySubscription,
  getMe,
  checkSessionExpiration,
  signOut,
});

export default AppLayoutContainer;
