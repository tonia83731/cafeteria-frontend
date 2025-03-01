import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useTranslations } from "next-intl";

import { RiStarSFill } from "react-icons/ri";
import FrontLayout from "@/components/layout/FrontLayout";
import AboutMobileImg from "@/public/images/about_mobile.png";
import AboutDesktopImg from "@/public/images/about_desktop.png";
import CommentForm from "@/components/about-page/CommentForm";
import { serverFetch } from "@/lib/server-fetch";

type CommentsData = {
  id: number;
  name: string;
  email: string;
  rate: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

interface AboutProps {
  comments: CommentsData[];
}

const AboutPage = ({ comments }: AboutProps) => {
  const t = useTranslations("About");
  console.log(comments);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <FrontLayout title={t("title")}>
      <div className="w-full h-[135px] md:h-[225px]">
        <Image
          src={AboutMobileImg}
          alt={t("title")}
          width={545}
          height={372}
          className="w-full h-full object-cover rounded-lg md:hidden"
        ></Image>
        <Image
          src={AboutDesktopImg}
          alt={t("title")}
          width={1275}
          height={800}
          className="w-full h-full object-cover rounded-lg hidden md:block"
        ></Image>
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-4">
          <Slider {...settings}>
            {comments.map(({ id, name, email, rate, comment }) => {
              return (
                <div
                  className="bg-ivory px-4 py-2 rounded-lg cursor-pointer h-[120px]"
                  key={`comment-${id}`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end justify-between gap-4">
                      <Link
                        href={`mailto:${email}`}
                        className="font-bold text-lg md:text-xl hover:underline hover:underline-offset-2"
                      >
                        {name}
                      </Link>
                      <div className="text-lg md:text-xl text-apricot flex items-center gap-0.5">
                        <RiStarSFill />
                        <p className="font-bold">{rate}</p>
                      </div>
                    </div>
                    <p className="text-fern-60 text-sm">{comment}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="text-sm md:text-base flex flex-col gap-4">
            <p>{t("intro")}</p>
            <ul className="flex flex-col gap-1">
              <li>{t("address")}</li>
              <li>{t("tel")}</li>
            </ul>
          </div>
        </div>
        <div className="h-[1px] w-full border-b-2 border-dashed border-natural-30 md:hidden"></div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-italiana">{t("comment-title")}</h3>
          <CommentForm />
        </div>
      </div>
    </FrontLayout>
  );
};

export default AboutPage;

export async function getStaticProps(context: any) {
  try {
    const response = await serverFetch("/comments/top5");
    if (!response.success)
      return {
        props: {
          comments: null,
          messages: (await import(`../messages/${context.locale}.json`))
            .default,
        },
      };

    return {
      props: {
        comments: response.data,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        comments: null,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  }
}
