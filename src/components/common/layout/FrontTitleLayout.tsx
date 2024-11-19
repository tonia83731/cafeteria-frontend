"use client";
import { ReactNode } from "react";
import { useParams } from "next/navigation";
import FrontHeader from "../header/Header";

const FrontTitleLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  // console.log(locale);
  const { locale } = useParams();
  return (
    <div>
      <FrontHeader locale={locale as string} />
      <div className="pt-[100px] pb-[60px] md:py-12 md:mx-auto md:w-[calc(100%-60px)] md:pl-[60px] lg:w-[calc(100%-240px)] lg:pl-[240px]">
        <div className="mx-auto max-w-[1200px] w-11/12 md:w-full">
          <div className="flex flex-col gap-8">
            <h1 className="font-italiana text-2xl md:text-4xl md:mb-4 uppercase">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontTitleLayout;
