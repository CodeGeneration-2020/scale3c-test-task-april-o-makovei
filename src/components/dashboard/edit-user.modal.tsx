import useAuth from '@/features/auth';
import Modal from '../modal/modal';
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { CSSProperties, FC, useEffect } from 'react';
import CustomInput from '../input/input';
import { EditUserModalState } from '@/features/api-types';
import { toast } from 'react-toastify';
import { KEY_MAP, disabledValues } from '@/lib/modal.values';
import { QUERIES } from '@/lib/queries';

interface EditUserModalProps {
  className?: string;
  style?: CSSProperties;
  isVisible: boolean;
  onClose: () => void;
  userId: string | null;
}

const EditUserModal: FC<EditUserModalProps> = ({
  className,
  isVisible,
  onClose,
  style,
  userId,
}: EditUserModalProps) => {
  const { retrieveUser, updateAdminUser } = useAuth();

  const { data: user, isLoading } = useQuery(
    QUERIES.USER({ userId: userId as string }),
    () => retrieveUser({ id: userId as string }),
    {
      enabled: !!userId,
    }
  );

  const { reset, control, watch, handleSubmit } = useForm<EditUserModalState>();
  const state = watch();

  const onSubmit = async (data: EditUserModalState) => {
    await updateAdminUser({
      id: data.id,
      email: data.email,
      user_metadata: {
        is_admin: data.is_admin,
        name: data.name,
      },
    });
    toast.success('User updated successfully');
    onClose();
  };

  useEffect(() => {
    if (user) {
      const {
        email,
        id,
        user_metadata: { is_admin, name },
      } = user;
      reset({ email, id, is_admin, name });
    }
  }, [user]);

  const renderBody = () => {
    return (
      <div className="grid gap-5">
        {state &&
          Object.keys(state).map((key) => {
            return (
              <Controller
                key={key}
                name={key as keyof typeof state}
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 place-items-start">
                    <label className="self-center">
                      {KEY_MAP[key as keyof typeof KEY_MAP][0]}
                    </label>
                    <CustomInput
                      className="w-full"
                      type={KEY_MAP[key as keyof typeof KEY_MAP][1]}
                      disabled={disabledValues.includes(key)}
                      value={field.value as unknown as string}
                      checked={field.value as unknown as boolean}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
            );
          })}
      </div>
    );
  };

  return (
    <Modal
      visible={isVisible}
      onClose={onClose}
      onSave={handleSubmit(onSubmit)}
      title="Edit the user"
      style={style}
      className={className}
      isLoading={isLoading}
    >
      {!isLoading ? (
        renderBody()
      ) : (
        <div
          data-testid="edit-user-modal-body"
          className="flex self-center w-full h-full justify-center items-center"
        >
          Loading...
        </div>
      )}
    </Modal>
  );
};

export default EditUserModal;
