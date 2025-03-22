const Login = () => {
  return (
    <div className="loginPage">
      <h1>Login</h1>
      <form>
        <label>
          Nome de Usuário:
          <input
            type="text"
            name="username"
            placeholder="Digite seu nome de usuário"
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
