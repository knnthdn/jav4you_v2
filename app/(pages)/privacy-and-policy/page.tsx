// import { Logo } from "@/app/page";
import { List, Paragraph } from "@/components/RootInfo";
import { ReactNode } from "react";

export default function page() {
  return (
    <div className=" text-gray-300 flex flex-col gap-5">
      <div className="mb-5">{/* <Logo /> */}</div>

      <h1 className="text-center text-3xl font-semibold">Privacy and Policy</h1>

      <Paragraph>
        Jav4You values the privacy of its users and is committed to protecting
        any personal information you share with us. This Privacy Policy outlines
        how we collect, use, and safeguard your information when you use our
        website. By accessing or using Jav4You, you agree to the terms described
        in this policy.
      </Paragraph>

      <Title>1. Information We Collect</Title>
      <Paragraph>
        We may collect the following types of information when you use Jav4You:
      </Paragraph>

      <span className="font-bold">a. Non-Personal Information</span>
      <ListWrapper>
        <List>
          Your IP address, browser type, operating system, and device
          information.
        </List>
        <List>
          The pages you visit on our website and the duration of your visits.
        </List>
        <List>Referring URLs and timestamps.</List>
      </ListWrapper>

      <span className="font-bold">b. Cookies and Tracking Technologies</span>
      <ListWrapper>
        <List>
          We use cookies and similar technologies to enhance your browsing
          experience, remember your preferences, and analyze website traffic.
        </List>
        <List>
          You can manage or disable cookies through your browser settings, but
          this may impact certain features of our website.
        </List>
      </ListWrapper>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>2. How We Use Your Information</Title>
      <Paragraph>
        The information we collect is used for the following purposes:
      </Paragraph>
      <ListWrapper>
        <List>To maintain and improve the functionality of our website.</List>
        <List>To analyze website usage trends and monitor performance.</List>
        <List>
          To ensure compliance with legal requirements and safeguard against
          unauthorized access or misuse of our platform.
        </List>
        <List>
          To display relevant advertisements to support the operation of the
          website.
        </List>
      </ListWrapper>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>3. Third-Party Advertisements and Links</Title>
      <Paragraph>
        Jav4You relies on third-party advertising services to cover the costs of
        running the platform. These third parties may collect information about
        your visits to our site and other websites to provide personalized
        advertisements.
      </Paragraph>
      <span>Please note:</span>
      <ListWrapper>
        <List>
          Jav4You is not responsible for the privacy practices of third-party
          advertisers or external websites linked from our platform.
        </List>

        <List>
          We encourage you to review the privacy policies of any third-party
          services you interact with.
        </List>
      </ListWrapper>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>4. Data Security</Title>
      <Paragraph>
        We take reasonable steps to protect the information collected on our
        platform from unauthorized access, alteration, disclosure, or
        destruction. However, no method of transmission over the internet or
        electronic storage is 100% secure, and we cannot guarantee absolute
        security.
      </Paragraph>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>5. Children&apos;s Privacy</Title>
      <Paragraph>
        Jav4You is not intended for use by individuals under the age of 18. We
        do not knowingly collect or store personal information from minors. If
        you believe a minor has accessed our platform, please contact us, and we
        will take the necessary steps to remove any related information.
      </Paragraph>

      <div className="border border-[#4e4d4d] my-2"></div>

      <Title>6. Contact Us</Title>
      <Paragraph>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at:{" "}
        <span className="inline-block"> ciandreviag@gmail.com</span>
      </Paragraph>
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-base font-bold tracking-wide sm:text-xl">{children}</h2>
  );
}

function ListWrapper({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-2 list-disc px-8 flex flex-col gap-2">{children}</ul>
  );
}
