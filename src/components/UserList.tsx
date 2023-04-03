import React, { FC } from 'react';
import UserListItem from './UserListItem';
import { getUserPersonalEntity } from '@src/utils/helpersUserAndEntity';
import { User } from 'types';

type UserListProps = {
  users: User[];
};

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <>
      {users.map((user, i) => {
        return (
          <div className="mb-3" key={i}>
            <UserListItem userEntity={getUserPersonalEntity(user)} />
          </div>
        );
      })}
    </>
  );
};

export default UserList;
