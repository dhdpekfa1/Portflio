import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";

interface ContactData {
  label: string;
  contact: string;
}

const AboutMe = () => {
  const data: ContactData[] = [
    {
      label: "email",
      contact: "dhdpekfa1@daum.net",
    },
    {
      label: "github",
      contact: " https://github.com/dhdpekfa1",
    },
    {
      label: "kakaoTalk",
      contact: "dhdpekfa",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <Card className="max-h-screen w-fit m-8 bg-ef dark:bg-slate-800 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-second">
            자기소개서
          </CardTitle>
          <CardDescription>TODO: 장점</CardDescription>
        </CardHeader>
        <CardContent>성장과정</CardContent>
      </Card>
    </div>
  );
};

export default AboutMe;
