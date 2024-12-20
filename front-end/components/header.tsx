export default function Header() {
  return (
    <>
      <div className="text-red-500">
        <div id="companyLogo">RDS</div>
        <div id="navbar">
          <ul>
            <li>Home</li>
            <li>Contact</li>
            <li>About</li>
            <li>Sign Up</li>
          </ul>
        </div>

        <div id="actions">
          <ul>
            <li>
              <input type="text" />
              search
            </li>
            <li>Like</li>
            <li>Shop</li>
          </ul>
        </div>
      </div>
    </>
  );
}
