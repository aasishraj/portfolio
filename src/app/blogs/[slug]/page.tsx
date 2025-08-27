import fs from "fs";
import path from "path";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import matter from "gray-matter";
import type { Metadata } from "next";

interface Frontmatter {
  title: string;
  tag: string;
  number?: number;
  description?: string;
  author?: string;
  date?: string;
}

// Type definitions for MDX component props
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type ListProps = React.HTMLAttributes<HTMLUListElement | HTMLOListElement>;
type ListItemProps = React.HTMLAttributes<HTMLLIElement>;
type BlockquoteProps = React.HTMLAttributes<HTMLQuoteElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type HRProps = React.HTMLAttributes<HTMLHRElement>;
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
type ThProps = React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
type TdProps = React.TdHTMLAttributes<HTMLTableCellElement>;

// Custom components that can be used in MDX
const components = {
  h1: (props: HeadingProps) => <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props} />,
  h2: (props: HeadingProps) => <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-4" {...props} />,
  h3: (props: HeadingProps) => <h3 className="text-xl font-semibold tracking-tight mt-8 mb-4" {...props} />,
  p: (props: ParagraphProps) => <p className="leading-7 mb-4" {...props} />,
  ul: (props: ListProps) => <ul className="my-6 list-disc pl-6" {...props} />,
  ol: (props: ListProps) => <ol className="my-6 list-decimal pl-6" {...props} />,
  li: (props: ListItemProps) => <li className="mt-2" {...props} />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-6" {...props} />
  ),
  a: (props: AnchorProps) => (
    <a className="text-primary underline-offset-4 hover:underline" {...props} />
  ),
  hr: (props: HRProps) => <hr className="border-border my-8" {...props} />,
  table: (props: TableProps) => (
    <table className="my-6 w-full border-collapse table-auto text-sm">
      {props.children}
    </table>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted/40 text-left">{props.children}</thead>
  ),
  th: (props: ThProps) => (
    <th className="px-3 py-2 font-semibold text-foreground border-b border-border" {...props} />
  ),
  td: (props: TdProps) => (
    <td className="px-3 py-2 border-b border-border" {...props} />
  ),
  img: (props: ImageProps) => {
    // Render a plain <img> to avoid invalid <div> inside <p>
    // Tailwind Typography will handle sizing/margins via prose classes
    return (
      <img
        loading="lazy"
        decoding="async"
        {...props}
        className={["my-6 rounded-lg shadow-md", props.className].filter(Boolean).join(" ")}
      />
    );
  },
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fullPath = path.join(process.cwd(), "blogs", `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(source);
  const baseTitle = typeof data.title === 'string' && data.title.trim().length > 0
    ? data.title
    : slug.replace(/-/g, ' ');
  return {
    title: `${baseTitle} - Blogs - Aasish Raj`,
  };
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const fullPath = path.join(process.cwd(), "blogs", `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  // Compile MDX with syntax highlighting
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeKatex,
          [
            rehypePrettyCode,
            {
              theme: {
                light: 'light-plus',
                dark: 'dark-plus',
              },
              keepBackground: false,
              defaultLang: 'plaintext',
            },
          ],
        ],
      },
    },
    components,
  });

  // Format date if available
  const formatDate = (date: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="container mx-auto max-w-4xl py-12 px-4">
      {/* Header */}
      <header className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{frontmatter.tag}</Badge>
          {frontmatter.number && (
            <span className="text-sm text-muted-foreground">
              #{frontmatter.number}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {frontmatter.title}
        </h1>
        
        {frontmatter.description && (
          <p className="text-lg text-muted-foreground">
            {frontmatter.description}
          </p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {frontmatter.author && <span>By {frontmatter.author}</span>}
          {frontmatter.date && formatDate(frontmatter.date) && (
            <>
              {frontmatter.author && <span>•</span>}
              <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
            </>
          )}
        </div>
      </header>

      <Separator className="mb-8" />

      {/* MDX Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none prose-pre:before:content-none prose-pre:after:content-none prose-img:my-8">
        {content}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "blogs");
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'));

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ""),
  }));
} 