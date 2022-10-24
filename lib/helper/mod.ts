import { Language, minify } from "https://deno.land/x/minifier@v1.1.1/mod.ts";
import * as fm from 'https://deno.land/std@0.153.0/encoding/front_matter.ts'
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts"

export const getStyle = async (file:string) => {
  const text = await Deno.readTextFile(file.replace("file://", ""))
  return minify(Language.CSS, text)
}


export type PostMeta = {
  title: string
  date: Date
  tags: string[]
  description: string
}

export const getContent = async (file:string) => {
  const text = await Deno.readTextFile(`./posts/${file}.md`)
  const { attrs, body: markdown } = fm.extract<PostMeta>(text)
  const content = render(markdown, { baseUrl: 'http://localhost:8000', allowIframes: false });
  return { attrs, content }
}

