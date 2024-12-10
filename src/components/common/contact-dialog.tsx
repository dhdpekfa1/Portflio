import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui";
import Image from "next/image";

const ContactDialog = () => {
  const data = [
    {
      label: "email",
      info: "dhdpekfa1@daum.net",
      contact: "mailto:dhdpekfa1@daum.net", // 이메일 클릭 시 이메일 앱 열기
    },
    {
      label: "github",
      contact: "https://github.com/dhdpekfa1", // 깃허브 링크
    },
    {
      label: "kakaoTalk",
      contact: null, // 카카오톡은 클릭 동작 없도록 설정
    },
  ];

  return (
    <Dialog>
      <DialogTrigger className="nev_btn text-two dark:text-ef">
        연락처
      </DialogTrigger>
      <DialogContent className="max-h-screen w-fit m-8 bg-ef dark:bg-slate-800 border border-gray-200">
        <CardHeader>
          <DialogTitle className="text-lg font-bold text-second">
            연락처
          </DialogTitle>
          <CardDescription>TODO: 짧은 소개 || 인사말</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <div key={item.label} className="flex gap-2">
                <span className="text-gray-600">{item.label}: </span>
                {item.contact ? (
                  <a
                    href={item.contact}
                    className="text-second dark:text-point hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.info || item.contact}
                  </a>
                ) : (
                  <span className="text-second dark:text-point cursor-default">
                    {item.info || item.label}
                  </span>
                )}
              </div>
            ))}
            <div className="flex items-center justify-center">
              <Image
                src="/images/kakao_qr.png"
                alt="Kakao QR Code"
                width={400}
                height={400}
                style={{ width: 180, height: "auto", borderRadius: 12 }}
                priority
              />
            </div>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export { ContactDialog };
