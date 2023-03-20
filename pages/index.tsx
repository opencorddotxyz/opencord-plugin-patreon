import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  return <div>hello world {process.env.NEXT_PUBLIC_BASE_URL} </div>;
};

export default IndexPage;
