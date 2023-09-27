import styled from "styled-components";

export function FullScreenLoader() {
  return (
    <Background>
      <Loader>
        <div className="lds-dual-ring"></div>
        <h2>Carregando...</h2>
      </Loader>
    </Background>
  );
}

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.ligthPrimary};
  opacity: 0.95;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 300px;
  height: 50px;

  h2 {
    color: ${({ theme }) => theme.colors.light};
  }

  .lds-dual-ring {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-bottom: 8px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 0.9s linear infinite;
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
