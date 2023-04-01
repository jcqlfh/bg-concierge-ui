import {createContext} from 'react';
import SearchModel from '../../screens/search/models/SearchModel';
import { Boardgame } from './Boardgame';

export type SuggestionContextValueType = {
  collection: string;
  colectionItems: number[]
  search: SearchModel
  suggestions: Boardgame[],
};
export type SuggestionContextType = {
  value: SuggestionContextValueType;
  setValue: (value: SuggestionContextValueType) => void;
};

export const SuggestionContext = createContext<SuggestionContextType>(
  {} as SuggestionContextType,
);
