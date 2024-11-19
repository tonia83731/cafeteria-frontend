import { useTranslations } from "next-intl";
const StepSection = () => {
  const t = useTranslations("Home");
  const steps_list = [
    {
      id: 1,
      title: `${t("steps.first.title")}`,
      description: `${t("steps.first.desc")}`,
    },
    {
      id: 2,
      title: `${t("steps.second.title")}`,
      description: `${t("steps.second.desc")}`,
    },
    {
      id: 3,
      title: `${t("steps.third.title")}`,
      description: `${t("steps.third.desc")}`,
    },
  ];
  return (
    <section
      className="w-full h-screen flex justify-center items-center pt-6"
      id="steps"
    >
      <div className="w-11/12 mx-auto md:w-[calc(100%-60px)] md:ml-[60px]">
        <div className="flex flex-col gap-12 md:w-8/12 md:mx-auto md:max-w-[750px]">
          <h1 className="text-2xl md:text-4xl font-italiana md:text-center">
            {t("steps.title")}
          </h1>
          <div className="flex flex-col gap-12 md:gap-6">
            {steps_list.map(({ id, title, description }) => {
              return (
                <div
                  className="relative md:grid md:grid-cols-[3.5rem_1fr] md:items-start md:justify-center gap-12"
                  key={`step-${id}`}
                >
                  <div className="text-4xl font-italiana flex justify-center items-center bg-fern text-ivory w-10 h-10 rounded-full md:w-14 md:h-14 absolute -top-1/4 left-1 md:static">
                    {id}
                  </div>
                  <div className="bg-ivory px-4 pt-6 pb-2 md:px-6 md:py-4 rounded-lg md:h-[110px] md:flex md:flex-col md:gap-2">
                    <h5 className="text-xl font-bold">{title}</h5>
                    <p className="text-base text-natural">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepSection;
