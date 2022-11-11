import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/componentes/CSSreset";
import Menu from "../src/componentes/Menu/Menu";
import { StyledTimeline } from "../src/componentes/Timeline";
import Favoritos from "../src/componentes/Favoritos";
const HomePage = () => {
  const cor = { backgroundColor: "white" };
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <CSSReset />

      <div style={cor}>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlist={config.playlist} />
        <Favoritos favorito={config.fav} />
      </div>
    </>
  );
};

const StyledHeader = styled.div`
  .banner {
    width: 100%;
    height: 30vh;
    object-fit: cover;
  }
  .user-info {
    margin-top: 32px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <img className="banner" src={config.banner} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({ searchValue, ...props }) {
  const playlistNomes = Object.keys(props.playlist);
  return (
    <StyledTimeline>
      {playlistNomes.map((playlistNomes) => {
        const videos = props.playlist[playlistNomes];
        return (
          <section key={playlistNomes}>
            <h2>{playlistNomes}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span> {video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

export default HomePage;
