import { object, string, ref, array } from "yup";

export const schema = object({
  nome: string().required("Nome é obrigatório"),
  email: string().email("Email inválido").required("Email obrigatório"),
  senha: string().required("Senha obrigatória"),
  validarSenha: string()
    .required()
    .oneOf([ref("senha")], "Senhas não coincidem"),
  faixaEtaria: string().oneOf(["criança", "adulto", "velho"]),
  profissao: string().when("faixaEtaria", {
    is: (value: string) => value == "adulto" || value == "velho",
    then: (schema) => schema.required("Profissão obrigatória para adultos"),
    otherwise: (schema) => schema.notRequired(),
  }),
  numeros: array()
    .length(1, "Só pode 1 celular e telefone")
    .of(
      object().shape({
        celular: string().matches(
          /^(\(?\d{2}\)?\s?)?(\d{4,5})[- ]?(\d{4})$/, // regex made by gpt
          "Número de celular inválido"
        ),
        telefone: string().matches(
          /^(\(?\d{2}\)?\s?)?(\d{4,5})[- ]?(\d{4})$/,
          "Número de telefone inválido"
        ),
      })
    ),
});

/* exemplo json para teste:
{
  "nome": "teste",
  "email": "teste@teste.com",
  "senha": "123",
  "validarSenha": "123",
  "faixaEtaria": "adulto",
  "numeros": [{"telefone":"11 98765-4321","celular":"15 99658-1234"}],
  "profissao": "dev"
} */
