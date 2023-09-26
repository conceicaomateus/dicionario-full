import { styled } from "styled-components";
import { useTermContext } from "../../../../contexts/TermContext";

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

  transition: all 0.1s;

  cursor: pointer;

  background-color: ${({ $isSelected }) => ($isSelected ? "#6a5e72" : "none")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#6a5e72")};

  &:hover {
    background-color: #6a5e72;
    color: white;
  }
`;
