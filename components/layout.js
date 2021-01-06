import Nav from "./nav";

export default function Layout({ user, children }) {
  return (
    <>
      <Nav user={user} />
      {children}
    </>
  );
}
