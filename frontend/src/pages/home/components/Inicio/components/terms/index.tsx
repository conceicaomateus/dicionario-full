import styled from "styled-components";
import { useTermContext } from "../../../../../../contexts/TermContext";

export function TermsList() {
  const { terms, isFetching } = useTermContext();

  return (
    <Container>
      {isFetching && <Loader />}

      {terms?.map(({ _id, title, description, examples }) => (
        <TermCard key={_id}>
          <Title>{title}</Title>

          <Description>{description}</Description>

          {examples && <Span>Exemplos</Span>}
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
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const TermCard = styled.div`
  background-color: #f4f5f8;
  border: 1px solid #c3c3c3;
  border-radius: 6px;

  display: flex;
  flex-direction: column;

  padding: 16px;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
`;

const Description = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;

const Span = styled.span`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
`;

const ExamplesWrapper = styled.ul`
  list-style: none;

  margin-left: 22px;
`;

const Example = styled.li`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
`;

const Loader = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;

  width: 50px;
  height: 50px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #333;
    border-color: #333 transparent #333 transparent;
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
