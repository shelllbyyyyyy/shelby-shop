import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type DasboardCardProps = {
  tittle: string;
  subtittle: string;
  body: string;
};

const DashboardCard: React.FC<DasboardCardProps> = ({
  tittle,
  subtittle,
  body,
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{tittle}</CardTitle>
          <CardDescription>{subtittle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{body}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardCard;
