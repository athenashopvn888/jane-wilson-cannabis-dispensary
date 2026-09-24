import Image from "next/image";

export default function CreativePhoto({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw"
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="creativePhoto">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </figure>
  );
}
