'use client'

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type BlogPostMeta = {
  slug: string
  title?: string
  number?: number
  tag?: string
  description?: string
  date?: string
  author?: string
}

type BlogListProps = {
  posts: BlogPostMeta[]
  tags: string[]
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = React.useState<string>("all")

  const filteredPosts = React.useMemo(
    () => (selectedTag === "all" ? posts : posts.filter((p) => p.tag === selectedTag)),
    [posts, selectedTag]
  )

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedTag === "all" ? "default" : "outline"}
            onClick={() => setSelectedTag("all")}
          >
            all
          </Button>
          {tags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`}>
            <Card className="cursor-pointer transition-all hover:shadow-lg relative">
              {post.tag ? (
                <div className="absolute top-4 right-4">
                  <Badge>{post.tag}</Badge>
                </div>
              ) : null}
              <CardHeader className="pr-20">
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


