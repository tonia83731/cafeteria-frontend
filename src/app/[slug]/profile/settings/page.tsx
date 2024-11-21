import SettingForm from "@/components/profile/SettingForm";
import SettingCardForm from "@/components/profile/SettingCardForm";
import SettingLanguageForm from "@/components/profile/SettingLanguageForm";
import SettingCarriersForm from "@/components/profile/SettingCarriersForm";
const SettingPage = () => {
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-[1.5fr_1fr]">
      <SettingForm />
      <div className="grid grid-rows-[1fr_2fr_1fr] gap-8">
        <SettingLanguageForm />
        <SettingCardForm />
        <SettingCarriersForm />
      </div>
    </div>
  );
};

export default SettingPage;
