import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';
import { Button } from '../Button';

export const Users = ({ items, invited, onClickInvite, onClickSend }) => {
  return (
    <>
      <ul className="users-list">
        {items.map((el) => (
          <User
            key={el.id}
            {...el}
            isInvited={invited.includes(el.id)}
            onClickInvite={onClickInvite}
          />
        ))}
      </ul>

      <Button
        className="send-invite-btn"
        onClick={onClickSend}
        disabled={invited.length === 0 ? true : false}
      >
        Send invitation
      </Button>
    </>
  );
};
