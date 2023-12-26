import { GeneratorClientTranslations } from '@/translations/TRANSLATION_TABLE';
import React, { createContext, useContext, useState } from 'react';

interface GenericTranslationContextProps<T> {
    dictionary: T;
}

export type Dictionary<T> = {
    [key : string] : T
};

// Create the context
const TranslationContext = createContext<GenericTranslationContextProps<any> | undefined>(undefined);

// Function to use the context
export const useTranslation = <T,>() => {
    const context = useContext<GenericTranslationContextProps<T> | undefined>(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};

// Provider component
export function TranslationProvider<T extends Dictionary<any>>({
    children,
    dictionaryTable,
}: {
    children: React.ReactNode;
    dictionaryTable: T;
}) {
    const [dictionary, setDictionary] = useState<T>(dictionaryTable);

    return (
        <TranslationContext.Provider value={{ dictionary }}>
            {children}
        </TranslationContext.Provider>
    );
};


// Translation hooks

export const useGeneratorTranslations = () =>
  useTranslation<GeneratorClientTranslations>();