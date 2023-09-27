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
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

type Tabs = "inicio" | "cadastrar";

interface TermContext {
  terms: Term[];
  onChangeLetter: (letter: string) => void;
  letters: string[];
  isFetching?: boolean;
  selectedTab: Tabs;
  onChangeTab: (tab: Tabs) => void;
  onDeleteTerm: (id: string) => void;
  onEditTerm: (id: string) => void;
  editId: string | null;
  term: Term | undefined;
  onSaveTerm: (term: Partial<Term>) => void;
  onSearchTerms: (search: string) => void;
}

const termContext = createContext({} as TermContext);

export function TermProvider({ children }: PropsWithChildren) {
  const [letters, setLetters] = useState<string[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<Term[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<Tabs>("inicio");
  const [editId, setEditId] = useState<string | null>(null);

  const onChangeTab = (tab: Tabs) => {
    setSelectedTab(tab);
    setEditId(null);
  };

  const { isFetching, isLoading, refetch } = useQuery({
    queryKey: ["terms", letters],
    queryFn: () => TermsService().List({ letters }),
    enabled: !!letters.length,
    onSuccess: (data) => {
      setTerms(data.items);
    },
  });

  const { data: item } = useQuery({
    queryFn: () => TermsService().GetById(editId ?? ""),
    queryKey: ["term", editId],
    enabled: !!editId,
  });

  const onChangeLetter = (letter: string) => {
    const copy = [...letters];

    if (letter === "A-Z") {
      setLetters(["A-Z"]);

      return;
    }

    if (copy.includes("A-Z")) copy.pop();

    if (copy.includes(letter)) {
      setLetters(copy.filter((l) => l !== letter));

      return;
    } else {
      setLetters([...copy, letter]);
    }
  };

  const onSearchTerms = (search: string) => {
    if (!search || search.length <= 0) return setFilteredTerms(null);

    const filteredTerms = terms.filter(({ description, title }) => {
      const searchLowerCase = search.toLowerCase();
      const descriptionLowerCase = description.toLowerCase();
      const titleLowerCase = title.toLowerCase();

      return (
        descriptionLowerCase.includes(searchLowerCase) ||
        titleLowerCase.includes(searchLowerCase)
      );
    });

    setFilteredTerms(filteredTerms);
  };

  const saveMutation = useMutation({
    mutationFn: (term: Partial<Term>) => TermsService().SaveOrUpdate(term),
    onSuccess: (id, term) => {
      setEditId(id);
      toast.success(`Termo '${id}' salvo com sucesso!`);
      const firstLetter = term.title?.split("")[0];

      if (letters.includes(firstLetter?.toUpperCase() ?? "")) {
        refetch();
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => TermsService().Delete(id),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
  });

  const onSaveTerm = (term: Partial<Term>) => {
    saveMutation.mutate(term);
  };

  const onDeleteTerm = (id: string) => {
    setTerms(terms.filter((term) => term._id !== id));
    deleteMutation.mutate(id);
  };

  const onEditTerm = (id: string) => {
    setEditId(id);
    setSelectedTab("cadastrar");
  };

  useEffect(() => {
    if (!letters.length) setTerms([]);
  }, [letters]);

  return (
    <termContext.Provider
      value={{
        letters,
        terms: filteredTerms ?? terms,
        isFetching: isFetching || isLoading,
        selectedTab,
        editId,
        term: item,
        onChangeLetter,
        onChangeTab,
        onDeleteTerm,
        onEditTerm,
        onSaveTerm,
        onSearchTerms,
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
