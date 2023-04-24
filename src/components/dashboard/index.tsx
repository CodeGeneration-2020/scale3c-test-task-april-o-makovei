import React, { BaseSyntheticEvent, useMemo, useState } from 'react';
import useAuth from '@/features/auth';
import Table, { Ordering } from '../table/table';
import { useQuery } from '@tanstack/react-query';
import { formatTimeToLocale } from '@/helpers/time/format-time-to-locale';
import Pagination from '../pagination/pagination';
import { filterArrayByString, sorterForArray } from '@/helpers/table/sorters';
import { User } from '@supabase/supabase-js';
import EditUserModal from './edit-user.modal';
import { QUERIES } from '@/lib/queries';
import CustomButton from '../button/button';
import { toast } from 'react-toastify';
import CustomInput from '../input/input';
import CreateUserModal from './create-user.modal';

const PAGE_LIMIT = 50;

const Dashboard = () => {
  const [orderKey, setOrderKey] = useState<string>('');
  const [orderDirection, setOrderDirection] = useState<Ordering>('asc');

  const [filterInput, setFilterInput] = useState<string>('');

  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { getAdminUserList, deleteAdminUser, profile } = useAuth();
  const user = profile?.user_metadata;

  const {
    data: userList,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery(QUERIES.USERS({ currentPage }), () =>
    getAdminUserList({ page: currentPage })
  );

  const indexedArray = useMemo(() => {
    const order = `${orderKey}.${orderDirection}`;
    return filterArrayByString(
      sorterForArray(userList?.users || [], order),
      filterInput
    );
  }, [orderKey, orderDirection, userList, currentPage, filterInput]);

  const handleCreateUserModalClose = () => {
    setIsCreateUserModalOpen(false);
    refetch();
  };
  const handleCreateUserModalOpen = () => {
    setIsCreateUserModalOpen(true);
  };
  const changePage = (page: number) => setCurrentPage(page);

  const handlEditUserModalClose = () => {
    setIsEditUserModalOpen(false);
    setSelectedUserId(null);
    refetch();
  };

  const handleRowClick = ({ id }: { id: User['id'] }) => {
    setSelectedUserId(id);
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = async ({
    event,
    id,
  }: {
    event: BaseSyntheticEvent<object, any, any> | undefined;
    id: User['id'];
  }) => {
    if (!event) {
      toast.error('Something went wrong. Please try again later.');
      return;
    }
    event?.stopPropagation();

    await deleteAdminUser({ id });
    refetch();
  };

  const handleFileterChange = (event: BaseSyntheticEvent<object, any, any>) => {
    setFilterInput(event.target.value);
  };
  const clearFilters = () => {
    setFilterInput('');
  };

  return (
    <div className="flex flex-col">
      {user?.is_admin && (
        <div className="flex flex-col w-full my-2 justify-end items-end gap-10">
          <div className="flex justify-end ">
            <CustomButton onClick={handleCreateUserModalOpen}>
              Create a new user
            </CustomButton>
          </div>

          <CustomInput
            placeholder="Filter by email, name or role..."
            className="w-1/3"
            value={filterInput}
            onChange={handleFileterChange}
          />
          {!!filterInput && (
            <CustomButton onClick={clearFilters}>Clear filters</CustomButton>
          )}
        </div>
      )}

      <Table
        data={indexedArray}
        loading={isLoading}
        refreshing={isRefetching}
        onRowClick={({ id }) =>
          (user?.is_admin && handleRowClick({ id })) || null
        }
        columns={[
          {
            title: 'Email',
            render: ({ email }) => email,
            orderDirection: orderKey === 'email' ? orderDirection : null,
            onOrderChange: (key) => {
              setOrderKey('email');
              setOrderDirection(key);
            },
          },
          {
            title: 'Name',
            render: ({ user_metadata: { name } }) => name || 'No name',
            orderDirection: orderKey === 'name' ? orderDirection : null,
            onOrderChange: (key) => {
              setOrderKey('name');
              setOrderDirection(key);
            },
          },
          {
            title: 'Role',
            render: ({ user_metadata: { is_admin } }) =>
              is_admin ? 'Admin' : 'User',
            orderDirection: orderKey === 'role' ? orderDirection : null,
            onOrderChange: (key) => {
              setOrderKey('role');
              setOrderDirection(key);
            },
          },
          {
            title: 'Updated at',
            render: ({ updated_at }) =>
              formatTimeToLocale(updated_at) || 'Never signed in',
            orderDirection: orderKey === 'updated_at' ? orderDirection : null,
            onOrderChange: (key) => {
              setOrderKey('updated_at');
              setOrderDirection(key);
            },
          },
          {
            title: 'Email confirmed at',
            render: ({ email_confirmed_at }) =>
              formatTimeToLocale(email_confirmed_at) || 'Not confirmed',
            orderDirection:
              orderKey === 'email_confirmed_at' ? orderDirection : null,
            onOrderChange: (key) => {
              setOrderKey('email_confirmed_at');
              setOrderDirection(key);
            },
          },
          {
            title: '',
            render: ({ id }) =>
              (user?.is_admin && (
                <CustomButton
                  onClick={(e) => handleDeleteUser({ event: e, id })}
                >
                  Delete
                </CustomButton>
              )) ||
              null,
          },
        ]}
      />
      <Pagination
        total={
          filterInput
            ? indexedArray.length
            : Math.ceil(userList?.total || 0 / PAGE_LIMIT)
        }
        current={currentPage}
        nextPage={userList?.nextPage}
        onChange={(page) => changePage(page)}
      />
      <EditUserModal
        isVisible={isEditUserModalOpen}
        onClose={handlEditUserModalClose}
        userId={selectedUserId}
      />
      <CreateUserModal
        isVisible={isCreateUserModalOpen}
        onClose={handleCreateUserModalClose}
      />
    </div>
  );
};

export default Dashboard;
