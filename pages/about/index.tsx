import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { defaultfetch } from "@/lib/fetch";
import FrontTitleLayout from "@/components/common/layout/FrontTitleLayout";
import CommentForm from "@/components/common/form/CommentForm";
import About_Mobile from "@/public/images/about_mobile.png";
import About_Desktop from "@/public/images/about_desktop.png";
import { FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";

type CommentAPIData = {
  id: number;
  rate: number;
  name: string;
  email: string;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};
const AboutPage = ({
  comments,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const t = useTranslations("About");

  return (
    <FrontTitleLayout title={t("title")}>
      <>
        <div className="md:hidden w-full h-[135px]">
          <Image
            src={About_Mobile}
            alt={t("title")}
            width={545}
            height={372}
            className="w-full h-full object-cover rounded-lg"
          ></Image>
        </div>
        <div className="hidden md:block w-full h-[225px]">
          <Image
            src={About_Desktop}
            alt={t("title")}
            width={1275}
            height={800}
            className="w-full h-full object-cover rounded-lg"
          ></Image>
        </div>
      </>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
        <div className="text-sm md:text-base flex flex-col gap-4">
          <Carousel
            swipeable={true}
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            showStatus={false}
            showIndicators={false}
          >
            {comments.map(
              ({ name, email, rate, comment, id }: CommentAPIData) => {
                return (
                  <div
                    className="flex flex-col gap-2 bg-ivory-60 rounded-lg px-4 py-2 min-h-[95px]"
                    key={id}
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        href={`mailto:${email}`}
                        className="font-medium hover:underline hover:underline-offset-1"
                      >
                        {name}
                      </Link>
                      <div className="text-apricot font-bold flex items-center gap-0.5">
                        <FaStar />
                        <p className="text-lg">{rate}</p>
                      </div>
                    </div>
                    <div className="text-natural text-sm text-start">
                      {comment ? comment : "No comments"}
                    </div>
                  </div>
                );
              }
            )}
          </Carousel>
          <p>{t("intro")}</p>
          <ul className="flex flex-col gap-1">
            <li>{t("address")}</li>
            <li>{t("tel")}</li>
          </ul>
        </div>
        <div className="h-[1px] w-full border-b-2 border-dashed border-natural-30 md:hidden"></div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-italiana">{t("comment-title")}</h3>
          <CommentForm />
        </div>
      </div>
    </FrontTitleLayout>
  );
};

export default AboutPage;

export async function getStaticProps(context: any) {
  try {
    const comments = await defaultfetch(`/api/comments/top5`);

    return {
      props: {
        comments: comments.data,
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.error("Error fetching data for static props:", error);
    return {
      props: {
        comments: [],
        messages: {},
      },
    };
  }
}
