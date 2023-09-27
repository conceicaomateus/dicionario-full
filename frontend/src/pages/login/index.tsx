import styled from "styled-components";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

export function Login() {
  const { login, error } = useAuthContext();
  const [user, setUser] = useState<{ name: string; password: string }>({
    name: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      login(user);
    }
  };

  return (
    <Body onKeyDown={onKeyDown}>
      <Wrapper>
        <span>Logo</span>

        <Container>
          <FormField>
            <Label>Usuário</Label>
            <Input
              placeholder="Digite seu usuário"
              name="name"
              onChange={handleInputChange}
            />
          </FormField>
          <FormField>
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              onChange={handleInputChange}
            />
          </FormField>

          {error && <span>{error}</span>}
        </Container>

        <Button type="button" onClick={() => login(user)}>
          Entrar
        </Button>
      </Wrapper>
    </Body>
  );
}

const Body = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 360px;
  height: 380px;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.primary};

  border-radius: 8px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  height: max-content;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.light};
`;

const Input = styled.input`
  height: 46px;
  border: none;
  border-bottom: 1px solid #cbcbcb;
  padding: 0px 8px;

  background-color: transparent;

  transition: all 0.2s ease-in-out;

  color: ${({ theme }) => theme.colors.light};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.purple};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const Button = styled.button`
  height: 46px;
  border-radius: 6px;
  padding: 0px 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.purple};
  color: white;

  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
