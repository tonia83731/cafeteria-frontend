import Image from "next/image";
import FrontTitleLayout from "@/components/common/layout/FrontTitleLayout";
import CommentForm from "@/components/about/CommentForm";
import About_Mobile from "@/public/images/about_mobile.png";
import About_Desktop from "@/public/images/about_desktop.png";
import { useTranslations } from "next-intl";
// import { getTop5Comments } from "@/api/comment";
const AboutPage = () => {
  const t = useTranslations("About");
  // const comments = await getTop5Comments();
  // console.log(comments);
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
