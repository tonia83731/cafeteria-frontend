"use client";
import { defaultfetch } from "@/lib/fetch";
import { useTranslations } from "next-intl";
// import { postComment, CommentBody } from "@/api/comment";
import { FormEvent, useRef, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";

type CommentBody = {
  name: string;
  email: string;
  rate: number;
  comment?: string;
};
const CommentForm = () => {
  const t = useTranslations("About");
  const [rating, setRating] = useState<number>(0);
  const [isHover, setIsHover] = useState<number | null>(null);
  const totalStars = [...Array(5)];
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const initializedInput = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (emailRef.current) {
      emailRef.current.value = "";
    }
    if (commentRef.current) {
      commentRef.current.value = "";
    }
    setIsHover(null);
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const comment = commentRef.current?.value;
    if (!name || !email || !rating) return;

    const body: CommentBody = {
      name,
      email,
      rate: rating,
    };
    if (comment) {
      body.comment = comment;
    }

    console.log(body);

    try {
      // const response = await fetch(`/api/comments`, {
      //   method: "POST",
      //   body,
      // });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }

    // const response = await postComment(body);

    // if (response.success) {
    //   toast.success(response.message);
    // } else {
    //   toast.error("Comment created failed");
    // }
  };

  return (
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
  );
};
export default CommentForm;
