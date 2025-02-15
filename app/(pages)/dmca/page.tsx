// import { Logo } from "@/app/page";
import { List, Paragraph, Title } from "@/components/RootInfo";

export default function page() {
  return (
    <div className=" text-gray-300 flex flex-col gap-5 ">
      <div className="mb-5">{/* <Logo /> */}</div>

      <h1 className="text-center text-3xl font-semibold">DMCA Policy</h1>

      <Paragraph>
        We respect the intellectual property rights of others and comply with
        the Digital Millennium Copyright Act (DMCA). As a content aggregator and
        search engine, Jav4You does not host any videos or media files on its
        own servers. All content provided on the platform is sourced from
        external websites and third-party services.
      </Paragraph>

      <Paragraph>
        If you believe that any content available through Jav4You infringes upon
        your copyright or other intellectual property rights, you may submit a
        DMCA takedown notice. We will respond promptly to properly submitted
        notices and remove or disable access to the infringing material in
        accordance with the DMCA.
      </Paragraph>

      <Title>How to Submit a DMCA Takedown Notice</Title>
      <Paragraph>
        To file a DMCA takedown request, please provide the following
        information:
      </Paragraph>

      <ul className="mt-2 list-decimal px-8 flex flex-col gap-2">
        <List>
          Identification of the copyrighted work that you claim has been
          infringed. Please provide sufficient detail so that we can locate the
          original work.
        </List>

        <List>
          Identification of the infringing material on Jav4You that you want
          removed. Include specific URLs or detailed descriptions to help us
          locate the content.
        </List>

        <List>
          Your contact information, including your full name, email address, and
          physical address.
        </List>

        <List>
          A statement that you have a good faith belief that the use of the
          material is not authorized by the copyright owner, its agent, or the
          law.
        </List>

        <List>
          A statement, under penalty of perjury, that the information you
          provide in your notice is accurate and that you are the copyright
          owner or authorized to act on their behalf.
        </List>

        <List>
          Your electronic or physical signature as the copyright owner or a
          person authorized to act on their behalf.
        </List>
      </ul>

      <Paragraph>
        Send your DMCA takedown notice to: ciandreviag@gmail.com
      </Paragraph>
    </div>
  );
}
