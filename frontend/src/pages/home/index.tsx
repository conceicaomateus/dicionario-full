import { styled } from "styled-components";
import { useAuthContext } from "../../contexts/AuthContext";
import { Inicio } from "./components/Inicio";
import { useState } from "react";
import { FormCadastro } from "./components/form-cadastro";

type Tabs = "inicio" | "cadastrar";

export function Home() {
  const { logout } = useAuthContext();
  const [selectedTab, setSelectedTab] = useState<Tabs>("inicio");

  return (
    <Body>
      <NavBar>
        <span onClick={() => setSelectedTab("inicio")}>Logo</span>

        <LinksContainer>
          <Link
            $isSelected={selectedTab === "inicio"}
            onClick={() => setSelectedTab("inicio")}
          >
            Início
          </Link>
          <Link
            $isSelected={selectedTab === "cadastrar"}
            onClick={() => setSelectedTab("cadastrar")}
          >
            Cadastrar
          </Link>
        </LinksContainer>

        <LeaveButton onClick={logout}>Sair</LeaveButton>
      </NavBar>

      {selectedTab === "inicio" && <Inicio />}

      {selectedTab === "cadastrar" && <FormCadastro />}
    </Body>
  );
}

const Body = styled.main`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #4f8699;
  padding: 0px 16px;

  color: white;

  span {
    cursor: pointer;
  }
`;

const Link = styled.span<{ $isSelected: boolean }>`
  height: max-content;

  border-bottom: ${({ $isSelected }) =>
    $isSelected ? "2px solid white" : "none"};

  cursor: pointer;
`;

const LinksContainer = styled.div`
  width: max-content;

  display: flex;
  gap: 24px;
`;

const LeaveButton = styled.button`
  background-color: transparent;
  border: none;

  color: white;
  font-size: 16px;
  cursor: pointer;
`;
