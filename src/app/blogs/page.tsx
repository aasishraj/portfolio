import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogList, { type BlogPostMeta } from "@/components/blog-list";

export const metadata: Metadata = {
  title: "Blogs - Aasish Raj",
};

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "blogs");
  const fileNames = fs.readdirSync(postsDirectory);

  const posts: BlogPostMeta[] = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        number: data.number,
        tag: data.tag,
        description: data.description,
        date: data.date,
        author: data.author,
      };
    });

  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    return timeB - timeA;
  });

  // Derive unique tags for filters (preserve insertion order)
  const tags = Array.from(
    posts.reduce((set, p) => {
      if (p.tag) set.add(p.tag);
      return set;
    }, new Set<string>())
  );

  return <BlogList posts={posts} tags={tags} />;
} 