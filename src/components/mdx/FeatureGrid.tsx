'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureGrid() {
  const features = [
    { title: "React Components", description: "Use any React component in your markdown" },
    { title: "Interactive Content", description: "Add dynamic elements to static posts" },
    { title: "Syntax Highlighting", description: "Beautiful code blocks with highlighting" },
    { title: "Custom Styling", description: "Style components with Tailwind CSS" }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 