
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "blogs");
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
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

  // Sort posts by number (newest first)
  posts.sort((a, b) => (b.number || 0) - (a.number || 0));

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-4xl font-bold">Blogs</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`}>
            <Card className="cursor-pointer transition-all hover:shadow-lg relative">
              <div className="absolute top-4 right-4">
                <Badge>{post.tag}</Badge>
              </div>
              <CardHeader className="pr-20">
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 