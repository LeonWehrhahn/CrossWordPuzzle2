import { TRANSLATION_TABLE } from "@/translations/TRANSLATION_TABLE";
import GeneratorClient from "@/components/generatorClient/GeneratorClient";
import { Locale } from "../../../i18n-config";

export default function Home({ params }: { params: { lang: Locale } }) {

  const translation = TRANSLATION_TABLE[params.lang];

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 justify-between">
      <div className="flex flex-col items-center p-4 gap-4 justify-center">
        <img src="https://placehold.jp/220x580.png" />
        <img src="https://placehold.jp/220x580.png" />
      </div>

      <GeneratorClient dictionary={translation.generator} />

      <div className="flex flex-col items-center p-4 gap-4 justify-center">
        <img src="https://placehold.jp/220x580.png" />
        <img src="https://placehold.jp/220x580.png" />
      </div>
    </div>
  );
}
