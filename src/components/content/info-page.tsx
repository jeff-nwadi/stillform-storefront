import Link from "next/link";
import type { ReactNode } from "react";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

type InfoSectionProps = {
  title: string;
  children: ReactNode;
};

export function InfoPage({ eyebrow, title, intro, children }: InfoPageProps) {
  return (
    <main className="info-page page-wrap">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        {title}
      </div>
      <header className="info-page-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="info-page-body">{children}</div>
    </main>
  );
}

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="info-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
