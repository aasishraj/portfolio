import fs from "fs";
import path from "path";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Counter } from "@/components/mdx/Counter";
import { FeatureGrid } from "@/components/mdx/FeatureGrid";

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
type CodeProps = React.HTMLAttributes<HTMLElement>;
type PreProps = React.HTMLAttributes<HTMLPreElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type HRProps = React.HTMLAttributes<HTMLHRElement>;
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

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
  code: (props: CodeProps) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: PreProps) => (
    <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto my-6" {...props} />
  ),
  a: (props: AnchorProps) => (
    <a className="text-primary underline-offset-4 hover:underline" {...props} />
  ),
  hr: (props: HRProps) => <hr className="border-border my-8" {...props} />,
  img: ({ src, alt, ...props }: ImageProps) => {
    // Use Next.js Image component for optimized images
    if (!src || typeof src !== 'string') return null;
    
    // For external images, use regular img tag with proper alt
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return <img 
        src={src} 
        alt={alt || "Blog post image"} 
        className="rounded-lg shadow-md my-8" 
        {...props} 
      />;
    }
    
    // For local images, use Next.js Image component
    return (
      <div className="relative w-full my-8">
        <Image
          src={src}
          alt={alt || "Blog post image"}
          width={800}
          height={400}
          className="rounded-lg shadow-md object-cover"
          unoptimized // Since we don't know dimensions at build time
        />
      </div>
    );
  },
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Counter,
  FeatureGrid,
};

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const fullPath = path.join(process.cwd(), "blogs", `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  // Compile MDX
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
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
      <div className="prose prose-neutral dark:prose-invert max-w-none">
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