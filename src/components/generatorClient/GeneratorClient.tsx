'use client';

import { TranslationProvider } from "@/providers/TranslationProvider";
import Generator from "./Generator";
import { GeneratorClientTranslations } from "@/translations/TRANSLATION_TABLE";

export default function GeneratorClient({
    dictionary
} : {
    dictionary: GeneratorClientTranslations
}) {
    
    return (
        <TranslationProvider dictionaryTable={dictionary}>
            <Generator />
        </TranslationProvider>
    )
}