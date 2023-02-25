import {createContext} from 'react';

export type SuggestionContextValueType = {
  collection: string;
};
export type SuggestionContextType = {
  value: SuggestionContextValueType;
  setValue: (value: SuggestionContextValueType) => void;
};

export const SuggestionContext = createContext<SuggestionContextType>(
  {} as SuggestionContextType,
);
