import DefaultInput from "../input/DefaultInput";
import DefaultPasswordInput from "../input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { ChangeEvent, FormEvent } from "react";
import { useTranslations } from "next-intl";
type ProfileFormProps = {
  userProfile: {
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    password: string;
  };
  isError: {
    status: boolean;
    message: string;
  };
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onProfileSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
const ProfileForm = ({
  userProfile,
  isError,
  onInputChange,
  onProfileSubmit,
}: ProfileFormProps) => {
  const t = useTranslations("Profile");
  return (
    <form
      className="flex flex-col gap-6 border border-apricot rounded-lg p-4"
      onSubmit={onProfileSubmit}
    >
      <DefaultInput
        id="name"
        name="name"
        label="Name"
        icon={<TiUser />}
        placeholder="Coffee Maniac"
        value={userProfile.name}
        onInputChange={onInputChange}
      />
      <DefaultInput
        id="email"
        name="email"
        type="email"
        label="Email"
        icon={<TbMailFilled />}
        isDisabled={true}
        placeholder="coffee.M@example.com"
        value={userProfile.email}
        onInputChange={onInputChange}
      />
      <DefaultPasswordInput
        id="password"
        name="password"
        label="Password"
        value={userProfile.password}
        onInputChange={onInputChange}
        placeholder="********"
      />
      <DefaultInput
        id="phone"
        name="phone"
        label="Phone"
        type="tel"
        icon={<MdOutlinePhoneAndroid />}
        value={userProfile.phone}
        onInputChange={onInputChange}
        placeholder="0912345678"
      />
      <DefaultInput
        id="address"
        name="address"
        label="Address"
        icon={<FaLocationDot />}
        value={userProfile.address}
        onInputChange={onInputChange}
        placeholder="TheCafe Rd. 113"
      />
      {isError.status && (
        <p className="text-heart text-sm">{isError.message}</p>
      )}
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="w-[80px] py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          {t("update-profile")}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
