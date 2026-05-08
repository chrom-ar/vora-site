import type { Messages } from "@/lib/messages";
import { TopBar } from "./top-bar";
import { Hero } from "./hero";
import { Problem } from "./problem";
import { Value } from "./value";
import { HowItWorks } from "./how-it-works";
import { Pilot } from "./pilot";
import { WhyNow } from "./why-now";
import { Closer } from "./closer";
import { Footer } from "./footer";

type Props = { messages: Messages; locale: "en" | "es" };

export const Landing = ({ messages, locale }: Props) => (
  <div lang={locale}>
    <TopBar t={messages.topBar} />
    <Hero t={messages.hero} />
    <Problem t={messages.problem} />
    <Value t={messages.value} />
    <HowItWorks t={messages.how} />
    <Pilot t={messages.pilot} />
    <WhyNow t={messages.whyNow} />
    <Closer t={messages.closer} contact={messages.footer.contact} />
    <Footer t={messages.footer} />
  </div>
);
