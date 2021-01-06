import Link from "next/link";

export default function Nav({ user }) {
  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
        {user && (
          <>
            <Link href="/exercise">
              <a className="nav-link">Exercises</a>
            </Link>
            <Link href="/workout">
              <a className="nav-link">Workouts</a>
            </Link>
            <Link href="/addworkout">
              <a className="nav-link">Add Workout</a>
            </Link>
            <Link href="/history">
              <a className="nav-link">Workout History</a>
            </Link>
          </>
        )}
      </div>

      <div className="right">
        {!user ? (
          <a className="nav-link" href="/api/login">
            Login
          </a>
        ) : (
          <>
            <h3 className="welcomeMsg">Welcome, {user.nickname}</h3>
            <a className="nav-link" href="/api/logout">
              Logout
            </a>
          </>
        )}
      </div>

      <style jsx>{`
        nav {
          display: block;
          height: 50px;
          line-height: 50px;
          background-color: #ffff00;
        }

        .nav-link {
          display: inline-block;
          padding: 0px 20px;
          height: 50px;
          transition: all 0.2s;
        }

        .nav-link:hover {
          background-color: black;
          color: #ffff00;
        }

        .welcomeMsg {
          display: inline-block;
          margin: 0;
          padding-right: 0.2rem;
        }

        .left {
          display: inline-block;
          float: left;
        }

        .right {
          display: inline-block;
          float: right;
        }
      `}</style>
    </nav>
  );
}
