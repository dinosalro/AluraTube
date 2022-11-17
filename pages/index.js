import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/componentes/Menu/Menu";
import { StyledTimeline } from "../src/componentes/Timeline";
import Favoritos from "../src/componentes/Favoritos";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ftbikywjycejmhrlbvhv.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0YmlreXdqeWNlam1ocmxidmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjUzNDQsImV4cCI6MTk4Mzk0MTM0NH0.sJwlrDEPXcuuoIiQxDZ151ilwke6DZq9YXtEwx5U9MY";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const HomePage = () => {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    supabase
      .from("Videos")
      .select("*")
      .then((dados) => {
        console.log(dados.data);
        const novasPlaylists = { ...playlists };
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist].push(video);
        });
        setPlaylists(novasPlaylists);
      });
  }, []);

  console.log("playlist", playlists);

  return (
    <>
      <div>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlist={playlists} />
        <Favoritos favorito={config.fav} />
      </div>
    </>
  );
};

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

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
      width: 100px;
      height: 100px;
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
