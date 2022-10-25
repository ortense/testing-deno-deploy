import { Language, minify } from "$minifier/mod.ts";
import * as fm from "$encoding/front_matter.ts";
import { render } from "$gfm/mod.ts";

export const getStyle = async (file: string) => {
  const text = await Deno.readTextFile(file.replace("file://", ""));
  return minify(Language.CSS, text);
};

export type PostAttrs = {
  title: string;
  date: Date;
  tags: string[];
  description: string;
};

export type PostData = PostAttrs & {
  file: string;
  slug: string;
};

export const getContent = async (file: string) => {
  const text = await Deno.readTextFile(`./posts/${file}.md`);
  const { attrs, body: markdown } = fm.extract<PostAttrs>(text);
  const content = render(markdown);
  return { attrs, content };
};

export const getPosts = async (): Promise<PostData[]> => {
  const posts: PostData[] = [];

  for await (const post of Deno.readDir(`./posts/`)) {
    if (post.isFile && post.name.endsWith(".md")) {
      const text = await Deno.readTextFile(`./posts/${post.name}`);
      const { attrs } = fm.extract<PostAttrs>(text);

      posts.push({
        file: post.name,
        slug: post.name.replace(".md", ""),
        ...attrs,
      });
    }
  }

  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
};
