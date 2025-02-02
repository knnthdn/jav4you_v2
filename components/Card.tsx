import { formatDuration } from "@/lib/utils";
import { SearchResponseTypes } from "./MainSection";
import Image from "next/image";
import Link from "next/link";

function Card({ data }: { data: SearchResponseTypes }) {
  return (
    <div className="grid gap-y-3 min-[350px]:grid-cols-2 min-[350px]:gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {data?.recomms.map((items, index) => {
        return (
          <Link
            href={`../?q=${items.id.toLowerCase()}`}
            key={index}
            onClick={() => localStorage.removeItem("code")}
            passHref
          >
            <div>
              <div className="relative w-full h-[60vw] min-[350px]:h-[30vw] sm:h-[20vw] md:h-[16vw] lg:h-[13vw] min-[1200px]:h-[10vw] min-[1300px]:max-h-[130px] rounded-md overflow-hidden cursor-pointer">
                <Image
                  src={`https://fourhoi.com/${items.id}/cover-n.jpg`}
                  alt={`${items.values.title_en} cover`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute hover:scale-105 transition-transform duration-300"
                />
                <span className="px-[3px] min-[350px]:text-xs min-[420px]:text-base rounded-sm absolute bottom-1 right-1 text-white bg-[#1e1e1eb0]">
                  {formatDuration(items.values.duration)}
                </span>

                {items.values.is_uncensored_leak && (
                  <span
                    className={`absolute min-[350px]:text-xs min-[420px]:text-base ${
                      !items.values.has_english_subtitle ? "bottom-1" : "top-1"
                    } left-1 px-[3px] rounded-sm  text-white bg-[#1e40afb0] font-semibold`}
                  >
                    uncensored
                  </span>
                )}

                <span className="px-[3px] min-[350px]:text-xs rounded-sm min-[420px]:text-base absolute bottom-1 left-1 text-white bg-[#b91c1cb0]">
                  english subtitle
                </span>
                {/* {items.values.has_english_subtitle && (
              )} */}
              </div>

              <span className="text-gray-300 line-clamp-1">
                {items.values.title_en}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Card;
