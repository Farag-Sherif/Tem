import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Glance } from "./components/Glance";
import { BoothConfigurator } from "./components/BoothConfigurator";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Standards } from "./components/Standards";
import { Clients } from "./components/Clients";
import { Contact } from "./components/Contact";
import { LangProvider } from "./i18n/LangContext";
import { useLenis } from "./lib/useLenis";

function Site() {
  const [ready, setReady] = useState(false);
  useLenis();

  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ready]);

  return (
    <div className="relative bg-ink">
      <Loader onDone={() => setReady(true)} />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Glance />
        <BoothConfigurator />
        <Services />
        <Work />
        <Standards />
        <Clients />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
