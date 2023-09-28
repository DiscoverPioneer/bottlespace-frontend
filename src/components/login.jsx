
function Login() {
  const submitForm = () => {
    console.debug('TODO: stub');
  };
  return (
    <div className="LoginForm">
      <h4 className="title">Bar Login</h4>
      <input placeholder="Email" type="text" name="email"/>
      <input placeholder="Email" type="password" name="password"/>
      <button onClick={submitForm} className="submit">
        Login
      </button>
      <a className="forgot-pw"
         href="/forgot-password"
      >Forgot Password?
    </a>
    </div>
  );
}

export default Login;
