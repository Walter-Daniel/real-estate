"use client";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui"

import { Social, Header, BackButton } from "@/components/auth";

export const CardWrapper = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
      <BackButton 
        label={backButtonLabel}
        href={backButtonHref}
      />
      </CardFooter>
    </Card>
  )
}
