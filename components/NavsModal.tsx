"use client";

import { useNavsProvider } from "@/context/NavsProvider";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type HeaderModalTypes = {
  title: string;
  child: ChildTypes[];
  isActive: boolean;
  index: number;
};

export type ChildTypes = {
  title: string;
  destination: string;
};

export default function NavsModal({
  title,
  child,
  isActive,
  index,
}: HeaderModalTypes) {
  // const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { activeNavs, setActiveNavs, setIsModalOpen } = useNavsProvider();

  function onSetActive() {
    if (isActive) {
      return setActiveNavs(0);
    } else {
      setActiveNavs(index);
    }
  }

  return (
    <div>
      <h4 className="px-4 py-2 text-[#2e3440] font-semibold tracking-wider">
        <button onClick={onSetActive} className="flex justify-between w-full">
          <span>{title}</span>

          <span>{isActive ? <ChevronUp /> : <ChevronDown />}</span>
        </button>
      </h4>

      {activeNavs === index && (
        <ul className="bg-[#2e3440] w-full ">
          {child.map((items: ChildTypes, index: number) => {
            return (
              <Link href={items.destination} key={index}>
                <li
                  className="w-full px-4 py-1 text-[#e5e9f0]"
                  onClick={() => setIsModalOpen(false)}
                >
                  {items.title}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
}
