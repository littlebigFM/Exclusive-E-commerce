import React from "react";
import Input from "../Components/Input/Input";
import Button from "../Components/UI/Button/Button";
import GoogleButton from "../Components/UI/Button/GoogleButton";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const AuthForm = ({
  type,
  nameOne,
  valueOne,
  onChangeOne,
  nameTwo,
  valueTwo,
  onChangeTwo,
  nameThree,
  valueThree,
  onChangeThree,
  nameFour,
  valueFour,
  onChangeFour,
  nameFive,
  valueFive,
  onChangeFive,
  nameSix,
  valueSix,
  onChangeSix,
  onSubmit,
  error,
  loading,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {type === "login" && (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <h1 className="font-medium text-[24px] min-[400px]:text-[30px] min-[600px]:text-[36px]">
              Log in to Exclusive
            </h1>
            <p className="font-regular text-[12px] min-[400px]:text-[16px]">
              Enter your details below
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[14px] px-[16px] py-[12px] rounded-[4px]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Email"
              name={nameFour}
              value={valueFour}
              onChange={onChangeFour}
            />

            <Input
              placeholder="Password"
              name={nameFive}
              value={valueFive}
              onChange={onChangeFive}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Button
              text={loading ? "Logging in..." : "Log In"}
              // disabled={!isFormValid}
              type="submit"
              className="w-[370px] max-[400px]:w-[300px] max-[330px]:w-full"
            />

            <GoogleButton text="Sign In With Google" icon={<FcGoogle />} />
          </div>

          <div className="flex item-center justify-center">
            <p className="font-regular text-[16px]">
              Do not have an account?{" "}
              <span
                className="font-medium cursor-pointer hover:text-[#DB4444] transition-colors"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      )}

      {type === "signup" && (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <h1 className="font-medium text-[24px] min-[400px]:text-[30px] min-[600px]:text-[36px]">
              Create an account
            </h1>
            <p className="font-regular text-[12px] min-[400px]:text-[16px]">
              Enter your details below
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[14px] px-[16px] py-[12px] rounded-[4px]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Input
              placeholder="First Name"
              name={nameOne}
              value={valueOne}
              onChange={onChangeOne}
            />
            <Input
              placeholder="Last Name"
              name={nameTwo}
              value={valueTwo}
              onChange={onChangeTwo}
            />
            <Input
              placeholder="Phone Number"
              name={nameThree}
              value={valueThree}
              onChange={onChangeThree}
            />
            <Input
              placeholder="Email"
              name={nameFour}
              value={valueFour}
              onChange={onChangeFour}
            />
            <Input
              placeholder="Password"
              name={nameFive}
              value={valueFive}
              onChange={onChangeFive}
            />
            <Input
              placeholder="Confirm Password"
              name={nameSix}
              value={valueSix}
              onChange={onChangeSix}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              // disabled={!isFormValid}
              text={loading ? "Creating Account..." : "Create Account"}
              className="w-[370px] max-[400px]:w-[300px] max-[330px]:w-full "
            />

            <GoogleButton text="Sign Up With Google" icon={<FcGoogle />} />
          </div>

          <div className="flex item-center justify-center">
            <p className="font-regular text-[16px]">
              Already have account?{" "}
              <span
                className="font-medium cursor-pointer hover:text-[#DB4444] transition-colors"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
