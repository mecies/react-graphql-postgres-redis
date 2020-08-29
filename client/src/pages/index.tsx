import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Navbar } from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar></Navbar>
      <div>
        {!data ? (
          <div>loading</div>
        ) : (
          data.posts.map((post) => <div key={post.id}>{post.title}</div>)
        )}
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
