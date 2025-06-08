"use client"; // This component needs to be a Client Component

import Image from "next/image";
import { useState } from "react"; // Import useState

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import Dialog components

type JobCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
};

export function JobCard({ title, description, imageUrl }: JobCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  return (
    <Card className="max-w-sm flex flex-col justify-between hover:shadow-lg transition-shadow p-0">
      {imageUrl && (
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t-md"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow justify-between h-full">
        <CardContent className="flex-grow">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
            {description}
          </p>
          {/* "Read More" button only appears if description is long enough to be clamped */}
          {description.length > 100 && ( // Adjust this length based on your desired truncation point
            <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="link" size="sm" className="px-0 py-4 h-auto text-primary">
                  Read More
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>
                    Full Job Description
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-sm text-foreground max-h-[70vh] overflow-y-auto"> {/* Added max-height and overflow for long descriptions */}
                  {description}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
        <CardFooter className="flex justify-between px-4 pb-4">
          <Button size="sm" variant="outline">
            Bookmark
          </Button>
          <Button size="sm">Apply Now</Button>
        </CardFooter>
      </div>
    </Card>
  );
}