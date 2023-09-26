import styled from "styled-components";
import { Alphabet } from "./components/alphabet";
import { TermsList } from "./components/terms";

export function Inicio() {
  return (
    <Body>
      <Alphabet />

      <Content>
        <TermsList />
      </Content>
    </Body>
  );
}

const Body = styled.main`
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  height: calc(100vh - 180px);
  width: 100%;
  padding: 20px 0px;
  margin-top: 30px;

  display: flex;
  justify-content: center;
  overflow-y: auto;
`;
