import { TopBar } from "@/components/vora/top-bar";
import { WorldMap } from "@/components/vora/world-map";
import { Headline } from "@/components/vora/headline";
import { Terminal } from "@/components/vora/terminal";
import { Ticker } from "@/components/vora/ticker";

const Page = () => (
  <div className="frame">
    <TopBar />
    <section className="stage">
      <WorldMap />
      <Headline />
    </section>
    <footer className="bottom">
      <Terminal />
      <Ticker />
    </footer>
  </div>
);

export default Page;
