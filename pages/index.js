import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/componentes/CSSreset";
import Menu from "../src/componentes/Menu";
import { StyledTimeline } from "../src/componentes/Timeline";
const HomePage = () => {
  const cor = { backgroundColor: "white" };
  console.log(config.playlist);
  return (
    <>
      <CSSReset />

      <div style={cor}>
        <Menu />
        <Header />
        <TimeLine playlist={config.playlist} />
      </div>
    </>
  );
};

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <img src="" />
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

function TimeLine(props) {
  console.log("dentro do componente", props.playlist);
  const playlistNomes = Object.keys(props.playlist);
  return (
    <StyledTimeline>
      {playlistNomes.map((playlistNomes) => {
        const videos = props.playlist[playlistNomes];
        return (
          <section>
            <h2>{playlistNomes}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
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
