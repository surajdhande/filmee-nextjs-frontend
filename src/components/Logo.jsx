import Link from "next/link";

export default function Logo({
  size = "text-3xl",
  clickable = true,
}) {
  const logo = (
    <h1 className={`${size} font-extrabold tracking-tight`}>
      <span className="text-white">Film</span>
      <span className="text-red-600">ee</span>
    </h1>
  );

  if (!clickable) {
    return logo;
  }

  return (
    <Link href="/">
      {logo}
    </Link>
  );
}