import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import * as yup from "yup";
import { useTermContext } from "../../../../contexts/TermContext";
import { useEffect } from "react";
import { FullScreenLoader } from "../../../../components/FullScreenLoader";

const termSchema = yup.object().shape({
  _id: yup.string(),
  title: yup.string().required("O Nome do Termo é obrigatório"),
  description: yup.string(),
  examples: yup.array(),
});

type Term = yup.InferType<typeof termSchema>;

const defaultValues: Term = {
  _id: "",
  title: "",
  description: "",
  examples: [],
};

export function FormCadastro() {
  const { term, onSaveTerm, isSaving, isFetchingTerm } = useTermContext();
  const {
    register,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Term>({
    resolver: yupResolver(termSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "examples",
  });

  useEffect(() => {
    reset(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <Body>
      {(isSaving || isFetchingTerm) && <FullScreenLoader />}
      <Form
        onSubmit={handleSubmit((data) => {
          onSaveTerm(data);
          reset(defaultValues);
        })}
      >
        <InputsWrapper>
          <FormField>
            <Label>Código</Label>
            <Id readOnly placeholder="Código do termo" {...register("_id")} />
          </FormField>

          <FormField>
            <Label $required>Nome do Termo</Label>
            <InputWithMessageError
              $errorMessage={errors.title?.message !== undefined}
            >
              <Input placeholder="Nome do termo" {...register("title")} />
              <MessageError>{errors.title?.message}</MessageError>
            </InputWithMessageError>
          </FormField>

          <FormField>
            <Label>Descrição</Label>
            <TextArea
              placeholder="Descrição do termo"
              {...register("description")}
            />
          </FormField>

          <FormField>
            <Label>Exemplos</Label>

            <ArrayInputsWrapper>
              <Input placeholder="Exemplo 1" {...register(`examples.${0}`)} />

              {fields?.map((field, index) => {
                if (index === 0) return;

                return (
                  <InputWithRemoveButton>
                    <Input
                      key={field.id}
                      placeholder={`Exemplo ${index + 1}`}
                      {...register(`examples.${index}`)}
                    />
                    <button type="button" onClick={() => remove(index)}>
                      <IoClose />
                    </button>
                  </InputWithRemoveButton>
                );
              })}
              {watch(`examples.${(watch("examples")?.length ?? 1) - 1}`) &&
                (watch("examples")?.length ?? 0) < 10 && (
                  <AddButton type="button" onClick={() => append("")}>
                    <FaPlus />
                    Adicionar
                  </AddButton>
                )}
            </ArrayInputsWrapper>
          </FormField>
        </InputsWrapper>

        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </Body>
  );
}

const Body = styled.main`
  margin-top: 32px;

  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;

  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 32px 48px;

  width: 800px;
  height: max-content;
  min-height: 500px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 60px;
`;

const InputsWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormField = styled.div`
  width: 100%;

  display: flex;
`;

const Label = styled.label<{ $required?: boolean }>`
  font-weight: ${({ $required }) => ($required ? "700" : "300")};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  width: 200px;
  min-width: 200px;
  height: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border: none;

  border-bottom: 1px solid #cbcbcb;
  padding: 0px 8px;

  background-color: transparent;

  transition: all 0.2s ease-in-out;

  color: ${({ theme }) => theme.colors.light};
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.purple};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const Id = styled.input`
  width: 100%;
  height: 30px;

  background-color: ${({ theme }) => theme.colors.light};
  border: none;

  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0px 8px;

  background-color: transparent;

  transition: all 0.2s ease-in-out;

  color: ${({ theme }) => theme.colors.light};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }

  cursor: default;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 60px;

  border: none;
  border-bottom: 1px solid #cbcbcb;
  padding: 0px 8px;

  background-color: transparent;

  transition: border 0.2s ease-in-out;

  color: ${({ theme }) => theme.colors.light};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.purple};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const ArrayInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;

  width: 100%;
`;

const InputWithRemoveButton = styled.div`
  position: relative;
  width: 100%;

  button {
    background-color: transparent;
    border: none;

    position: absolute;

    right: 6px;
    top: 2px;

    svg {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.light};
    }

    cursor: pointer;

    &:hover {
      svg {
        color: ${({ theme }) => theme.colors.purple};
      }
    }
  }
`;

const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  padding: 6px;

  width: 100px;
  height: 30px;

  background-color: ${({ theme }) => theme.colors.purple};
  border: none;

  border-radius: 6px;

  color: ${({ theme }) => theme.colors.white};

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

const SaveButton = styled.button`
  width: 140px;
  height: 40px;

  background-color: ${({ theme }) => theme.colors.purple};
  border: none;

  border-radius: 6px;

  color: ${({ theme }) => theme.colors.white};

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

const InputWithMessageError = styled.div<{ $errorMessage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;

  input:focus {
    border-color: ${({ theme, $errorMessage }) =>
      $errorMessage && theme.colors.red};
  }
`;

const MessageError = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;

  padding-left: 4px;
`;
