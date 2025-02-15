// import { Logo } from "@/app/page";
import { Paragraph } from "@/components/RootInfo";
import { ReactNode } from "react";

export default function page() {
  return (
    <div className="px-3 text-gray-300 flex flex-col gap-3 ">
      <div className="mb-5">{/* <Logo /> */}</div>

      <h1 className="text-center text-3xl font-semibold">
        Frequently Asked Question.
      </h1>

      <Title>Q1. Why am I getting no results for my search query?</Title>
      <Paragraph>
        <span className="italic">Answer: </span>
        It looks like you&apos;ve entered a code that doesn&apos;t exist or may
        be incorrect. Please double-check your code and try again.
      </Paragraph>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>
        Q2. Why am I seeing a &apos;Too many requests&apos; message when trying
        to download a video?
      </Title>
      <Paragraph>
        <span className="italic">Answer: </span>
        This usually happens if you’ve clicked the download button multiple
        times. Wait for 1 minute, then try again. Refresh your browser to ensure
        the page works correctly.
      </Paragraph>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>
        Q3. What should I do if I get an error message and no file downloads
        when I click the download button?
      </Title>
      <Paragraph>
        <span className="italic">Answer: </span>
        Refresh your browser and try clicking the download button again. This
        often resolves the issue.
      </Paragraph>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>
        Q4. I&apos;m redirected to another page when I click download or play
        the video.
      </Title>
      <Paragraph>
        <span className="italic">Answer: </span>
        This is normal. Jav4You uses ads to cover the costs of running the site.
        Simply return to the Jav4You tab, and you can continue watching or
        downloading your video without losing progress.
      </Paragraph>
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-base font-bold tracking-wide sm:text-xl">{children}</h2>
  );
}
