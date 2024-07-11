import { getCurrDate } from "../functions/getCurrDate";
import { date2text } from "../functions/date2text";
import { useEffect, useState } from "react";
import { SITE_DOMAIN } from "../config";

// Retrieves and adds comments to posts client-side through REST-API and mongoDB database.
const CommentSection = ({ slug }: { slug: string }) => {
  const [name, setName] = useState<string>("");
  const [textArea, setTextArea] = useState<string>("");
  const [comments, setComments] = useState<CommentList>([] as CommentList);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);

  // on mount - fetch comments for post (slug)
  useEffect(() => {
    const fetchCommentsFromDb = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${SITE_DOMAIN}/api/comments?slug=${slug}`);
        const data: CommentList = await res.json();
        setIsLoading(false);
        setComments(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };

    fetchCommentsFromDb();
  }, [slug]);

  // on form submission - add new comment to database AND the local version of the comments so the user sees the comment.
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // compile new comment
      let newComment: MyComment = {
        name,
        comment: textArea,
        date: getCurrDate(),
        slug,
      };

      // add new comment to database
      await fetch(`${SITE_DOMAIN}/api/comments`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      // add new comment to local UI version of comments.
      setComments((prevComments) => [newComment, ...prevComments]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }

    // clear text fields for user
    setName("");
    setTextArea("");
  };

  return (
    <div className="my-4">
      {/* <div className="flex flex-col space-y-2 mb-4 items-start"> */}
      <form onSubmit={(e) => handleSubmit(e)} aria-label="Comment section" className="flex flex-col space-y-2 mb-4 items-start">
        <h1 className="text-2xl font-bold mb-2">Comments</h1>
        <input
          type="text"
          className="w-full text-primary-light"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
          value={name}
          required
        />
        <textarea
          name="message"
          minLength={4}
          rows={3}
          className="w-full text-primary-light"
          placeholder="Comment"
          value={textArea}
          onChange={(e) => {
            setTextArea(e.target.value);
          }}
          required
        />
        <div>
          <input type="submit" className="m-auto p-2 flex items-center border text-primary-light border-primary-light dark:border-primary-dark bg-red-100" value={isError ? "error" : isLoading ? "loading..." : "Submit"} />
        </div>
      </form>
      <hr />
      <div className="flex flex-col space-y-4 my-4">
        {comments.map((comment, idx) => (
          <>
            <div key={idx}>
              <div className="flex space-x-2 items-center">
                <p className="font-bold">{comment.name}</p>
                <p className="text-sm">{date2text(comment.date)}</p>
              </div>
              <p>{comment.comment}</p>
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
