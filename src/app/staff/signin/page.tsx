import Link from "next/link";
import Image from "next/image";
import { PiCoffeeBeanFill } from "react-icons/pi";
import StaffSignIn1 from "@/public/images/admin/admin_signin_1.png";
import StaffSignIn2 from "@/public/images/admin/admin_signin_2.png";
import StaffSignIn3 from "@/public/images/admin/admin_signin_3.png";
import StaffSignIn4 from "@/public/images/admin/admin_signin_4.png";
import StaffSignIn5 from "@/public/images/admin/admin_signin_5.png";
import StaffSignIn6 from "@/public/images/admin/admin_signin_6.png";
import StaffSignIn7 from "@/public/images/admin/admin_signin_7.png";
import StaffSignIn8 from "@/public/images/admin/admin_signin_8.png";
import StaffSignIn9 from "@/public/images/admin/admin_signin_9.png";
import StaffSigninForm from "@/components/staff/StaffSigninForm";
const image_arr = [
  {
    id: "img-1",
    src: StaffSignIn1,
  },
  {
    id: "img-2",
    src: StaffSignIn2,
  },
  {
    id: "img-3",
    src: StaffSignIn3,
  },
  {
    id: "img-4",
    src: StaffSignIn4,
  },
  {
    id: "img-5",
    src: StaffSignIn5,
  },
  {
    id: "img-6",
    src: StaffSignIn6,
  },
  {
    id: "img-7",
    src: StaffSignIn7,
  },
  {
    id: "img-8",
    src: StaffSignIn8,
  },
  {
    id: "img-9",
    src: StaffSignIn9,
  },
];
const SigninPage = () => {
  return (
    <div className="h-screen flex flex-col gap-8 justify-center items-center">
      <div className="text-4xl flex items-center gap-2">
        <PiCoffeeBeanFill />
        <h1 className="font-italiana">THE CAFE | STAFF</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_1fr] md:items-center md:gap-8 w-11/12 lg:w-full max-w-[900px]">
        <div className="hidden w-[320px] h-[320px] md:grid grid-cols-3 grid-rows-3 gap-4">
          {image_arr.map(({ id, src }) => {
            return (
              <Image
                key={id}
                src={src}
                alt={id}
                width={320}
                height={320}
                className="w-full h-full object-cover"
              ></Image>
            );
          })}
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <h5 className="font-medium text-2xl font-noto_sans">歡迎回來!</h5>
          <StaffSigninForm />
          <p className="text-xs text-natural font-noto_sans">
            不是工作人員? 回到 {""}
            <span>
              <Link
                href="/"
                className="underline hover:italic hover:font-medium"
              >
                首頁/Home
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
