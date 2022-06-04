const Private = ({ username, logout }) => {
  return (
    <div>
      <h1>Szia, <span>{username}</span>!</h1>
      <div>Formázott tartalom</div>
      <button className="logoutBtn" onClick={logout}>Kijelentkezés</button>
    </div>
  );
};

export default Private;
