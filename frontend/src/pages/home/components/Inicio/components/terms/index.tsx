import styled from "styled-components";
import { useTermContext } from "../../../../../../contexts/TermContext";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { BiSolidTrashAlt } from "react-icons/bi";

export function TermsList() {
  const { terms, isFetching, onDeleteTerm, onEditTerm } = useTermContext();
  const [onHoverIndex, setOnHoverIndex] = useState<number | null>(null);

  return (
    <Container>
      {isFetching && <Loader />}

      {terms?.map(({ _id, title, description, examples }, index) => (
        <TermCard
          key={_id}
          onMouseEnter={() => setOnHoverIndex(index)}
          onMouseLeave={() => setOnHoverIndex(null)}
        >
          <Title>{title}</Title>

          <EditDeleteWrapper $isOpen={index === onHoverIndex}>
            <EditDeleteButton onClick={() => onEditTerm(_id)}>
              <MdEdit />
            </EditDeleteButton>
            <EditDeleteButton onClick={() => onDeleteTerm(_id)}>
              <BiSolidTrashAlt />
            </EditDeleteButton>
          </EditDeleteWrapper>

          {description.length > 0 && <Description>{description}</Description>}

          {examples[0].length > 0 && <Span>Exemplos</Span>}
          <ExamplesWrapper>
            {examples.map((ex, index) => (
              <Example key={index}>{ex}</Example>
            ))}
          </ExamplesWrapper>
        </TermCard>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 800px;
`;

const TermCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: max-content;
  margin-bottom: 24px;

  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;

  padding: 22px 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow: hidden;
`;

const EditDeleteWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  position: absolute;
  right: 0px;
  top: 0px;

  padding: 12px 16px;

  transition: all 0.2s ease-in-out;
  transform: translateY(${({ $isOpen }) => ($isOpen ? "0px" : "-100%")});
`;

const EditDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: ${({ theme }) => theme.colors.ligthPrimary};

  border-radius: 8px;

  width: 40px;
  height: 40px;

  transition: all 0.2s;

  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.light};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  cursor: pointer;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.light};
`;

const Description = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey400};
`;

const Span = styled.span`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.light};
`;

const ExamplesWrapper = styled.ul`
  list-style: none;

  margin-left: 22px;
`;

const Example = styled.li`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey400};
`;

const Loader = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;

  width: 50px;
  height: 50px;

  z-index: 99;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.colors.purple};
    border-color: ${({ theme }) =>
      `${theme.colors.purple} transparent ${theme.colors.purple} transparent`};
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
