import Nav from "./nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>

      <style jsx>
        {`
          main {
            margin: 0 auto;
            width: 800px;
          }
        `}
      </style>
    </>
  );
}
