import { Handlers, PageProps } from "$fresh/server.ts"
import { Head } from "../components/Head.tsx";
import { getPosts, PostData } from "../lib/helper/mod.ts";


export const handler:Handlers = {
  async GET(_, ctx) {
    const posts = await getPosts()
    return ctx.render({ posts })
  }
}

type HomeProps = {
  posts: PostData[]
}

export default function Home({ data }:PageProps<HomeProps>) {
  return (
    <>
      <Head>
        <title>Marcus Ortense | Fresh Blog</title>
      </Head>
      <section className="content Home">
        <div className="hero">
          <h1>Marcus Ortense</h1>
          <p>This app was created just to test <a href="https://deno.com/deploy">Deno Deploy</a></p>
        </div>
        {data.posts.map((post) => {
          return <a className="post" href={`/posts/${post.slug}`}>
            <article>
              <h2>{post.title}</h2>
              <span>{(new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' })).format(post.date)}</span>
              <p>{post.description}</p>
            </article>
          </a>
        })}
      </section>
    </>
  );
}
