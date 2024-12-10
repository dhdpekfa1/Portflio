// import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";

const AboutMe = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[85%] h-[80%] m-8 bg-ef dark:bg-slate-800 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-second">
            TODO: 자기소개서
          </CardTitle>
          <CardDescription>장점</CardDescription>
        </CardHeader>
        <CardContent>성장과정</CardContent>
      </Card>
    </div>
  );
};

export default AboutMe;
