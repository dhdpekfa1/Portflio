import Link from "next/link";

const MoreButton = () => {
  return (
    <div className="flex items-center justify-end w-[85%] gap-2">
      <p>아직 궁금하다면?</p>
      <Link
        href="/about-me?detail=true"
        className="underline cursor-pointer"
        typeof="button"
      >
        {"👉🏻 더 보러가기"}
      </Link>
    </div>
  );
};

export { MoreButton };
