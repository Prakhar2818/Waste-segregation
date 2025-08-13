import "../assets/scss/style.scss";

const Navbar = () => (
  <header className="header">
    <div className="cu-container d-flex align-items-between justify-content-around" style={{width:"100vw"}}>
      <div className="logo">
        <span className="logo-icon">♻️</span>
        <h1>RecycleHub</h1>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#sell">Sell Waste</a>
          </li>
          <li>
            <a href="#buy">Buy Materials</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <button className="btn-primary px-3 py-2 border border-0 rounded-5">Get Started</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Navbar;
