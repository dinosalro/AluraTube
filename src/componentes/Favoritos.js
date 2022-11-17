import React from "react";

const Favoritos = (props) => {
  console.log(props.favorito);
  return (
    <div style={{ paddingLeft: "32px" }}>
      <h3 style={{ fontSize: "16px", marginBottom: "16px" }}>Favoritos</h3>
      <div style={{ display: "flex" }}>
        {props.favorito.map((fav) => {
          return (
            <div
              key={fav.user}
              style={{
                marginRight: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a href={fav.url}>
                <img
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                  src={fav.img}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favoritos;
