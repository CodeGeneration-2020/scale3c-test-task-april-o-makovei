import { Controller, useForm } from 'react-hook-form';
import Modal from '../modal/modal';
import { KEY_MAP, disabledValues } from '@/lib/modal.values';
import CustomInput from '../input/input';
import useAuth from '@/features/auth';
import { CSSProperties, useEffect } from 'react';

interface CreateUserModalProps {
  className?: string;
  style?: CSSProperties;
  isVisible: boolean;
  onClose: () => void;
}

const defaultValues = {
  email: '',
  id: '',
  is_admin: false,
  name: '',
  password: '',
};

const CreateUserModal = ({
  className,
  isVisible,
  onClose,
  style,
}: CreateUserModalProps) => {
  const { createAdminUser } = useAuth();
  const { handleSubmit, watch, control, reset } = useForm({
    defaultValues,
  });

  const state = watch();

  const onSubmit = async (data: any) => {
    await createAdminUser({
      email: data.email,
      password: data.password,
      user_metadata: {
        is_admin: data.is_admin,
        name: data.name,
      },
    });
    onClose();
  };

  useEffect(() => {
    if (!isVisible) {
      reset({ ...defaultValues });
    }
  }, [isVisible]);

  const renderBody = () => {
    return (
      <div className="grid gap-2">
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
      title="Create a User"
      visible={isVisible}
      onClose={onClose}
      onSave={handleSubmit(onSubmit)}
      style={style}
      className={className}
    >
      {renderBody()}
    </Modal>
  );
};

export default CreateUserModal;
