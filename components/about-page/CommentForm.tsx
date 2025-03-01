import { useTranslations } from "next-intl";
import { FormEvent, useRef, useState } from "react";
import validator from "validator";
import { FaStar, FaRegStar } from "react-icons/fa";

import { toast } from "react-toastify";
import { clientFetch } from "@/lib/client-fetch";

const CommentForm = () => {
  const t = useTranslations("About");
  const [rating, setRating] = useState<number>(0);
  const [isHover, setIsHover] = useState<number | null>(null);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });
  const totalStars = [...Array(5)];
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const commentRef = useRef<any>(null);

  const initializedData = () => {
    setRating(0);
    if (nameRef.current) nameRef.current.value = null;
    if (emailRef.current) emailRef.current.value = null;
    if (commentRef.current) commentRef.current.value = null;
    setIsError({
      status: false,
      message: "",
    });
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsError({
      status: false,
      message: "",
    });
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const comment = commentRef.current?.value;

    if (!name || !email || !rating) {
      setIsError({
        status: true,
        message: `${t("error.blank")}`,
      });
      return;
    }
    if (!validator.isEmail(email)) {
      setIsError({
        status: true,
        message: `${t("error.invalid-email")}`,
      });
      return;
    }
    if (comment.length > 150) {
      setIsError({
        status: true,
        message: `${t("error.exceed")}`,
      });
      return;
    }
    const body = {
      name,
      email,
      rate: rating,
      comment: comment ? comment : "",
    };

    try {
      const response = await clientFetch("/comments", "POST", false, body);

      if (response.success) {
        toast.success(`${t("success")}`);
        initializedData();
      } else {
        toast.error(`${t("failed")}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isError.status && (
        <p className="text-sm text-red-400">{isError.message}</p>
      )}
      <form
        action=""
        className="w-full flex flex-col gap-4"
        onSubmit={handleCommentSubmit}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <div className="grid grid-cols-5 items-center justify-center gap-1 text-xl">
              {totalStars.map((star, index) => {
                const currRating = index + 1;
                return (
                  <label className="" key={`star-${index}`}>
                    <input
                      type="radio"
                      name="rating"
                      value={currRating}
                      onChange={() => setRating(currRating)}
                      className="hidden"
                    ></input>
                    <span
                      className=""
                      onMouseEnter={() => setIsHover(currRating)}
                      onMouseLeave={() => setIsHover(null)}
                    >
                      {currRating <= ((isHover as number) || rating) ? (
                        <FaStar className="text-apricot" />
                      ) : (
                        <FaRegStar className="text-natural-30" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="font-medium">{rating}</div>
            <div className="font-medium text-sm opacity-75">
              {["Bad", "Fair", "Good", "Nice", "Excellent"][rating - 1]}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-base md:text-lg">
              {t("form.name")}
            </label>
            <input
              id="name"
              name="name"
              ref={nameRef}
              type="text"
              placeholder="Coffee Maniac"
              className="bg-ivory px-2 text-fern h-10 rounded-lg hover:border hover:border-fern focus:border focus:border-fern"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-base md:text-lg">
              {t("form.email")}
            </label>
            <input
              id="email"
              name="email"
              ref={emailRef}
              type="email"
              placeholder="coffee.M@example.com"
              className="bg-ivory px-2 text-fern h-10 rounded-lg hover:border hover:border-fern focus:border focus:border-fern"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="comment" className="text-base md:text-lg">
              {t("form.comment")}
            </label>
            <textarea
              name="comment"
              id="comment"
              ref={commentRef}
              placeholder={t("form.comment-placeholder")}
              className="resize-none hover:resize-y bg-ivory px-2 py-2 text-fern rounded-lg hover:border hover:border-fern focus:border focus:border-fern"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CommentForm;
