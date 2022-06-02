import React from "react";

function SquareComponent(props) {
  let classes = props.className ? `${props.className} square` : "square";
  return (
    <span className={classes} onClick={props.onClick}>
      {props.gameState}
    </span>
  );
}

export default SquareComponent;
