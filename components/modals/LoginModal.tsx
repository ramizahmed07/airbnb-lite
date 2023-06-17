"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "@/components/Button";
import useRegisterModal from "@/hooks/useRegisterModal";

export default function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((res) => {
      setIsLoading(false);
      if (!res?.error) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      } else {
        toast.error(res.error);
      }
    });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footer = (
    <div className="flex flex-col gap-4 mt-3 ">
      <hr />
      <Button onClick={() => signIn("google")} outline icon={FcGoogle}>
        Continue with Google
      </Button>
      <Button onClick={() => signIn("github")} outline icon={AiFillGithub}>
        Continue with Github
      </Button>

      <div className="justify-center text-neutral-500 mt-4 font-light flex flex-row items-center gap-2">
        <div>First time using airbnb?</div>
        <div
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Create an account
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  );
}
