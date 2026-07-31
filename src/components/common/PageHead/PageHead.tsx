import Head from "next/head";

interface PropsType {
  title?: string;
}

export const PageHead = (props: PropsType) => {
  const { title = "acara" } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};
