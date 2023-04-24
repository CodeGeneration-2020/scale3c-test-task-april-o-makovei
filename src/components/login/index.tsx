import { ILoginForm, IRegisterForm, ISignForm } from "@/components/login/types";
import CustomInput from "../input/input";
import useAuth from "@/features/auth";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../button/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ROUTER_CONSTANTS } from "@/lib/router";
import { signInInputs, singUpInputs } from "./utils";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleIsSignInChange = () => {
    setIsSignIn(!isSignIn);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signUp, isAuthenticated } = useAuth();
  const router = useRouter();

  const { handleSubmit, control } = useForm<ISignForm<typeof isSignIn>>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ISignForm<typeof isSignIn>) => {
    setIsSubmitting(true);
    await signIn({ email: data.email, password: data.password });
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTER_CONSTANTS.DASHBOARD);
    }
  }, [router, isAuthenticated]);

  const renderSingIn = () => {
    return (
      <div className="center w-screen h-screen">
        <div className="content">
          {signInInputs.map((_) => {
            return (
              <Controller
                key={_.name}
                name={_.name as keyof ILoginForm}
                control={control}
                rules={{ required: true }}
                render={({ field, formState: { errors } }) => {
                  return (
                    <CustomInput
                      type={_.type}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            );
          })}

          <CustomButton onClick={handleIsSignInChange}>Sign Up</CustomButton>
          <CustomButton
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </CustomButton>
        </div>
      </div>
    );
  };

  const handleSingUp = async (data: ISignForm<typeof isSignIn>) => {
    setIsSubmitting(true);
    await signUp({ ...data });
    setIsSubmitting(false);
  };

  const renderSingUp = () => {
    return (
      <div className="center w-screen h-screen">
        <div className="content">
          {singUpInputs.map((_) => {
            return (
              <Controller
                key={_.name}
                name={_.name as keyof IRegisterForm}
                control={control}
                rules={{ required: true }}
                render={({ field, formState: { errors } }) => {
                  return (
                    <CustomInput
                      type={_.type}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            );
          })}

          <CustomButton onClick={handleIsSignInChange}>Sign In</CustomButton>
          <CustomButton
            isLoading={isSubmitting}
            onClick={handleSubmit(handleSingUp)}
          >
            Sign Up
          </CustomButton>
        </div>
      </div>
    );
  };

  return isSignIn ? renderSingIn() : renderSingUp();
};
export default Login;
