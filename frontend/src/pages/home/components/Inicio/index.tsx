import styled from "styled-components";
import { Alphabet } from "./components/alphabet";
import { TermsList } from "./components/terms";
import { FaPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useTermContext } from "../../../../contexts/TermContext";

export function Inicio() {
  const { onChangeTab, onSearchTerms, letters } = useTermContext();

  const placeholder =
    letters.length === 0 ? "Selecione uma letra..." : "Pesquisa...";

  return (
    <Body>
      <Alphabet />

      <HeaderList>
        <SearchInput $disabled={letters.length === 0}>
          <input
            type="text"
            placeholder={placeholder}
            disabled={letters.length === 0}
            onChange={({ target }) => onSearchTerms(target.value)}
          />
          <GoSearch />
        </SearchInput>

        <NewButton onClick={() => onChangeTab("cadastrar")}>
          <FaPlus />
          Novo
        </NewButton>
      </HeaderList>

      <Content>
        <TermsList />
      </Content>
    </Body>
  );
}

const Body = styled.main`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderList = styled.header`
  margin-top: 30px;

  display: flex;
  justify-content: space-between;

  padding: 0px 12px;
  width: 100%;
  max-width: 1200px;
`;

const SearchInput = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;

  height: 36px;
  width: 420px;
  padding: 0px 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    border-color: ${({ theme, $disabled }) =>
      !$disabled && theme.colors.purple};

    svg {
      color: ${({ theme, $disabled }) => !$disabled && theme.colors.purple};
    }
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.purple};

    svg {
      color: ${({ theme }) => theme.colors.purple};
    }
  }

  svg {
    margin-left: 16px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary};
  }

  input {
    background-color: transparent;
    border: none;

    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.colors.primary};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }

    &:disabled {
      cursor: default;
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`;

const NewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.ligthPrimary};
  border: none;

  padding: 6px 12px;
  font-size: 14px;

  color: ${({ theme }) => theme.colors.white};

  svg {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    filter: brightness(1.2);
  }

  cursor: pointer;
`;

const Content = styled.div`
  height: calc(100vh - 220px);
  width: 100%;
  padding: 20px 0px;
  margin-top: 30px;

  display: flex;
  justify-content: center;
  overflow-y: auto;
`;
