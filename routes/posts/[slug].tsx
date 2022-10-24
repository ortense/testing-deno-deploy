import { PageProps, Handlers } from "$fresh/server.ts";
import { Head } from "../../components/Head.tsx";

import { getContent, PostMeta } from "../../lib/helper/mod.ts";

type PostProps = {
  style: string
  content: string
  attrs: PostMeta
}

export const handler:Handlers<PostProps> = {
  async GET(_, ctx) {
    const { attrs, content } = await getContent(ctx.params.slug)

    return ctx.render({ style: '', attrs, content })
  }
}

export default function Post(props: PageProps<PostProps>) {
  return <>
    <Head>
      <title>{props.data.attrs.title } | Fresh Deno</title>
      <meta name="description" content={props.data.attrs.description} />
    </Head>
    <article className="content">
      <div className="hero">
        <h1>{props.data.attrs.title}</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html:props.data.content }}/>
    </article>
  </>;
}
