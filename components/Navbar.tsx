import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-brand">
        <span className="nav-brand-mark">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
            <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 8.5h6M8 11.5h4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </span>
        SIBITA
      </Link>
      <Link href="/masuk" className="nav-btn">
        Masuk ›
      </Link>
    </nav>
  );
}
