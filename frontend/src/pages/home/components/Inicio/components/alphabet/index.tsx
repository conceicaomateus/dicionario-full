import { styled } from "styled-components";
import { useTermContext } from "../../../../../../contexts/TermContext";

const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "A-Z",
];

export function Alphabet() {
  const { onChangeLetter, letters } = useTermContext();

  return (
    <Container>
      {LETTERS.map((letter) => (
        <Letter
          key={letter}
          $isSelected={letters.includes(letter)}
          onClick={() => onChangeLetter(letter)}
        >
          {letter}
        </Letter>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 94vw;
  height: max-content;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  margin-top: 16px;
  overflow: hidden;
`;

const Letter = styled.span<{ $isSelected: boolean }>`
  width: 40px;
  min-width: 20px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  cursor: pointer;

  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.purple : "none"};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#6a5e72")};

  font-weight: ${({ $isSelected }) => ($isSelected ? 500 : 400)};

  &:hover {
    font-weight: 600;

    background-color: ${({ theme, $isSelected }) =>
      !$isSelected && theme.colors.light};
    color: ${({ theme, $isSelected }) => !$isSelected && theme.colors.purple};
  }
`;
