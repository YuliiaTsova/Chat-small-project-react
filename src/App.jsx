import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { Search } from './components/Search';
import { Skeleton } from './components/Users/Skeleton';
function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearhValue] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users')
      .then(({ data }) => {
        setUsers(data.data);
        setFilteredUsers(data.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error during loading');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((u) => {
        const fullName = u.first_name + u.last_name;
        if (
          fullName
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase().replace(/\s/g, '')) ||
          u.email
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase().replace(/\s/g, ''))
        ) {
          return true;
        }
      })
    );
  }, [searchValue]);

  const onChangeSearch = (e) => {
    setSearhValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invitedUsers.includes(id)) {
      setInvitedUsers((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvitedUsers((prev) => [...prev, id]);
    }
  };

  const onClickSend = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invitedUsers.length} />
      ) : isLoading ? (
        <div className="skeleton-list">
          {[...Array(6)].map((el, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <div>
          <Search value={searchValue} onChangeSearch={onChangeSearch}></Search>
          {filteredUsers.length > 0 ? (
            <Users
              items={filteredUsers}
              invited={invitedUsers}
              onClickInvite={onClickInvite}
              onClickSend={onClickSend}
            />
          ) : (
            <div className="no-matches"> No matches </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
