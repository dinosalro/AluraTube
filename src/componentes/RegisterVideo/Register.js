import React from "react";
import { StyledRegisterVideo } from "./styledRegister";

function useForm(props) {
  const [values, setValues] = React.useState(props.initialValue);
  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setValues({ ...values, [name]: value });
    },
    clearForm() {
      setValues({});
    },
  };
}

const Register = () => {
  const formCadastro = useForm({
    initialValue: { titulo: "", url: "" },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do vídeo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
              name="titulo"
            />
            <input
              placeholder="URL"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
              name="url"
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
};

export default Register;
