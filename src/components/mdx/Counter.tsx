'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <Card className="my-6">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold">Count: {count}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
            <Button variant="outline" onClick={() => setCount(0)}>Reset</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 