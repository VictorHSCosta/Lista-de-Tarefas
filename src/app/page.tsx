import { BlocosFrontEnd } from "~/app/_components/blocosFrontEnd";
import Footer from "~/app/_components/footer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-backgroundColor">
      <header className="font-Playfair flex h-16 justify-center p-16 text-primaryColor">
        <h1 className="text-[24px] md:text-5xl">Lista de Tarefas</h1>
      </header>
      <section className="h-fit flex-1 p-8">
        <div className="flex justify-center md:justify-end">
          <button className="rounded bg-primaryColor p-1 uppercase text-white md:p-2">
            <a href="/incluir">Incluir</a>
          </button>
        </div>

        <div className="mt-8 border-2">
          <BlocosFrontEnd />
        </div>
      </section>
      <Footer />
    </main>
  );
}
