import { Head } from "../components/Head.tsx";


export default function Home() {
  return (
    <>
      <Head>
        <title>Marcus Ortense | Fresh Blog</title>
      </Head>
      <section className="content">
        <div className="hero">
          <h1>Marcus Ortense</h1>
        </div>
        <a href="/posts/hello">Mussum Ipsum: Hello world again</a>
      </section>
    </>
  );
}
