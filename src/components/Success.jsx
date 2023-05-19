import React from 'react';
import { Button } from './Button';
import success from '../assets/img/success.svg';

export const Success = ({ count }) => {
  return (
    <div className="success-block">
      <img src={success} alt="Success" />
      <h3>Success!</h3>
      {console.log('count', count)}
      {count === 1 ? (
        <p>The invitation was sent to {count} user</p>
      ) : (
        <p>The invitations were sent to {count} users</p>
      )}
      <Button className="send-invite-btn" onClick={() => window.location.reload()}>
        Back
      </Button>
    </div>
  );
};
