import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <div>
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
        <Link href="/exercise">
          <a className="nav-link">Exercises</a>
        </Link>
        <Link href="/workout">
          <a className="nav-link">Workouts</a>
        </Link>
        <Link href="/start">
          <a className="nav-link">Start Workout</a>
        </Link>
        <Link href="/history">
          <a className="nav-link">Workout History</a>
        </Link>
        <Link href="/stats">
          <a className="nav-link">Exercise Stats</a>
        </Link>
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
      `}</style>
    </nav>
  );
}
