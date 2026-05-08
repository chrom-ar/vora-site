import type { Tokens as TokensT } from "@/lib/messages";

type Props = { value: TokensT };

export const Tokens = ({ value }: Props) => (
  <>
    {value.lead}
    <em>{value.em}</em>
    {value.tail ?? ""}
  </>
);
