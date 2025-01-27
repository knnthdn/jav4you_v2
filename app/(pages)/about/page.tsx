import { Logo } from "@/app/page";
import { Paragraph } from "@/components/RootInfo";

export default async function page() {
  return (
    <div className="px-3 text-gray-300 flex flex-col gap-3 sm:px-6 md:px-16 lg:max-w-screen-lg lg:mx-auto">
      <div className="mb-5">
        <Logo />
      </div>

      <h1 className="text-center text-3xl font-semibold">About Jav4You</h1>
      <Paragraph>
        Jav4You is a free and user-friendly online platform dedicated to
        providing seamless access to JAV videos for enthusiasts worldwide.
        Serving as a specialized search engine, Jav4You makes it incredibly
        simple to search, watch, and download JAV content directly from the
        internet. The platform is designed to cater to a wide range of user
        preferences, ensuring that you can easily find the videos you&apos;re
        looking for with minimal effort.
      </Paragraph>

      <Paragraph>
        One of the standout features of Jav4You is its ability to help users
        locate specific JAV content using unique codes, commonly known as JAV
        codes. By entering the code into the platform&apos;s search bar, users
        can quickly discover the exact video they are looking for. This feature
        eliminates the hassle of browsing through countless unrelated videos,
        making the search process fast and efficient.
      </Paragraph>

      <Paragraph>
        Once you&apos;ve found your desired video, Jav4You offers multiple
        options for viewing and downloading. You can choose to stream the video
        directly on the platform or download it to your device for offline
        viewing. The platform also provides various download quality options,
        allowing you to select the resolution that best suits your needs,
        whether you prefer high-definition quality or a smaller file size to
        save storage space.
      </Paragraph>

      <Paragraph>
        Jav4You is committed to delivering a hassle-free experience,
        prioritizing ease of use and accessibility. With its robust search
        functionality, vast library of content, and flexible download options,
        the platform is designed to meet the needs of both casual viewers and
        dedicated fans of JAV content. Whether you&apos;re exploring new videos
        or searching for a specific title, Jav4You ensures a smooth and
        enjoyable experience every time.
      </Paragraph>
    </div>
  );
}
