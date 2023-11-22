import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { ReactElement } from 'react';

interface Card {
  value: string;
  text: string;
  icon: ReactElement;
}

export default function HeroCard({ value, text, icon }: Card) {
  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <Typography level="h1">{icon}</Typography>

        <CardContent>
          <Typography level="body-md">{text}</Typography>
          <Typography level="h2">{value}</Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
}
