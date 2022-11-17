import { createClient } from "@supabase/supabase-js";
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

const PROJECT_URL = "https://ftbikywjycejmhrlbvhv.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0YmlreXdqeWNlam1ocmxidmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjUzNDQsImV4cCI6MTk4Mzk0MTM0NH0.sJwlrDEPXcuuoIiQxDZ151ilwke6DZq9YXtEwx5U9MY";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);
function getThumb(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}
console.log();
const Register = () => {
  const formCadastro = useForm({
    initialValue: {
      titulo: "",
      url: "",
      playlist: "Aleatório",
    },
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
            supabase
              .from("Videos")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumb(formCadastro.values.url),
                playlist: formCadastro.values.playlist,
              })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });

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
            <select
              placeholder="Playlist"
              value={formCadastro.values.playlist}
              onChange={formCadastro.handleChange}
              name="playlist"
            >
              <option value="AnnaBee">AnnaBee</option>
              <option value="Músicas">Músicas</option>
              <option value="Aleatório">Aleatório</option>
            </select>
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
