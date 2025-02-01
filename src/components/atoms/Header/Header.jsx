import "./Header.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "/src/context/AuthContext";
import { LogoutBtn } from "/src/components/atoms/LogoutBtn";

export const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <div id="logo">
        <img
          alt="Wine App logo"
          src="https://media.istockphoto.com/id/1142870345/es/vector/botella-de-vino-de-dibujos-animados-y-vidrio-emoji-icono-aislado.jpg?s=612x612&w=0&k=20&c=EyClkmXsVX5FjkXhuxi1YEwUZxA5qa6T-p_wAphhDpc="
        />
        <h1>Wine App</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </nav>
      <div id="user_register_login">
        <ul>
          {!user ? (
            <>
              <li>
                <NavLink to="/register">Registrarse</NavLink>
              </li>
              <li>
                <NavLink to="/login">Iniciar Sesión</NavLink>
              </li>
            </>
          ) : (
            <>
              {/* Botón para modificar perfil dinámico según el rol */}
              <li>
                <NavLink to={user.role === "consumers" ? "/profile/consumer" : "/profile/winery"}>
                  Modificar Perfil
                </NavLink>
              </li>
              {/* Botón de Logout */}
              <li>
                <LogoutBtn />
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};
