import styled from "styled-components";
import { useTermContext } from "../../../../contexts/TermContext";

export function TermsList() {
  const { terms } = useTermContext();

  return (
    <Container>
      {terms?.map(({ _id, title, description, examples }) => (
        <TermCard key={_id}>
          <Title>{title}</Title>

          <Description>{description}</Description>

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
  width: 600px;
  height: auto;

  display: flex;
  flex-direction: column;
`;

const TermCard = styled.div`
  border: 1px solid #444;

  display: flex;
  flex-direction: column;
`;

const Title = styled.span``;

const Description = styled.span`
  margin-top: 16px;
`;

const ExamplesWrapper = styled.ul`
  list-style: none;
`;

const Example = styled.li``;
