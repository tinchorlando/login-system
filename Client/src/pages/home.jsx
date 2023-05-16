import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <h1>Hola mundo!</h1>
      <h2>
        <Link to="/profile">Ir al Perfil</Link>
      </h2>
    </div>
  );
}
