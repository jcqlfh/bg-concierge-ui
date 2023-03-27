import {createContext} from 'react';
import SearchModel from '../../screens/search/models/SearchModel';

export type SuggestionContextValueType = {
  collection: string;
  search: SearchModel
  suggestions: []
};
export type SuggestionContextType = {
  value: SuggestionContextValueType;
  setValue: (value: SuggestionContextValueType) => void;
};

export const SuggestionContext = createContext<SuggestionContextType>(
  {} as SuggestionContextType,
);
