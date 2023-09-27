import { styled } from "styled-components";
import { useAuthContext } from "../../contexts/AuthContext";
import { Inicio } from "./components/Inicio";
import { FormCadastro } from "./components/form-cadastro";
import { useTermContext } from "../../contexts/TermContext";
import { PiSignOut } from "react-icons/pi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Home() {
  const { logout } = useAuthContext();
  const { selectedTab, onChangeTab, onLogout } = useTermContext();

  return (
    <Body>
      <ToastContainer
        position="top-left"
        hideProgressBar={false}
        autoClose={500}
      />
      <NavBar>
        <Logo
          alt="logo"
          src="/logo.png"
          onClick={() => onChangeTab("inicio")}
        />

        <LinksContainer>
          <Link
            $isSelected={selectedTab === "inicio"}
            onClick={() => onChangeTab("inicio")}
          >
            Início
          </Link>
          <Link
            $isSelected={selectedTab === "cadastrar"}
            onClick={() => onChangeTab("cadastrar")}
          >
            Cadastro
          </Link>
        </LinksContainer>

        <LogoutButton
          onClick={() => {
            logout();
            onLogout();
          }}
        >
          <PiSignOut />
        </LogoutButton>
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

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  padding: 0px 16px;

  span {
    cursor: pointer;
  }
`;

const Link = styled.span<{ $isSelected: boolean }>`
  height: max-content;

  padding: 4px 12px;
  border-radius: 8px;

  background-color: ${({ $isSelected, theme }) =>
    $isSelected && theme.colors.secondary};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      !$isSelected && theme.colors.ligthPrimary};
  }

  font-weight: 500;
`;

const LinksContainer = styled.div`
  width: max-content;

  display: flex;
  gap: 16px;
`;

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: none;

  font-size: 16px;

  padding: 4px 12px;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.white};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.ligthPrimary};
  }

  svg {
    font-size: 20px;
  }
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  cursor: pointer;
`;
