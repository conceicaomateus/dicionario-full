/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Term } from "../core/models/term";
import { TermsService } from "../core/services/terms-service";
import { useQuery } from "react-query";

interface TermContext {
  terms: Term[];
  onChangeLetter: (letter: string) => void;
  letters: string[];
  isFetching?: boolean;
}

const termContext = createContext({} as TermContext);

export function TermProvider({ children }: PropsWithChildren) {
  const [letters, setLetters] = useState<string[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);

  const { isFetching, isLoading } = useQuery({
    queryKey: ["terms", letters],
    queryFn: () => TermsService().List({ letters }),
    enabled: !!letters.length,
    onSuccess: (data) => {
      setTerms(data.items);
    },
  });

  const onChangeLetter = (letter: string) => {
    if (letters.includes(letter)) {
      setLetters(letters.filter((l) => l !== letter));
    } else {
      setLetters([...letters, letter]);
    }
  };

  useEffect(() => {
    if (!letters.length) setTerms([]);
  }, [letters]);

  return (
    <termContext.Provider
      value={{
        letters,
        onChangeLetter,
        terms,
        isFetching: isFetching || isLoading,
      }}
    >
      {children}
    </termContext.Provider>
  );
}

export function useTermContext() {
  const context = useContext(termContext);

  if (!context) throw new Error("Contexto não encontrado");

  return context;
}
