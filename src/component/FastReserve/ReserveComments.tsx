import { useState } from "react";
import Image from "next/image";

import userprofile from "../../assets/reserve/Ellipse 15.svg";

import {
    useCreateComment,
    useHouseComments,
    useUpdateComment,
} from "@/core/api/comments/CommentQuery/CommentQuery";

const ReserveComments = ({ id }) => {

    const { data } = useHouseComments(id);

    const { mutate: createComment } = useCreateComment();
    const { mutate: updateComment } = useUpdateComment();

    const [caption, setCaption] = useState("");
    const [title, setTitle] = useState("");

    const [parentCommentId, setParentCommentId] = useState(null);

    const [editingCommentId, setEditingCommentId] = useState(null);

    const handleSendComment = () => {

        if (!caption.trim()) return;

        // اگر در حالت ویرایش هستیم
        if (editingCommentId) {
            updateComment({
                id: editingCommentId,
                data: {
                    title: title || "نظر کاربر",
                    caption,
                    rating: 5
                }
            });

            setEditingCommentId(null);
        } else {

            createComment({
                house_id: Number(id),
                title: title || "نظر کاربر",
                caption,
                rating: 5,
                parent_comment_id: parentCommentId
            });

        }

        setCaption("");
        setTitle("");
        setParentCommentId(null);
    };


    const handleEdit = (comment) => {
        setEditingCommentId(data?.comments?.id);
        setCaption(comment.caption);
        setTitle(comment.title);


    };


    return (
        <div
            className="w-full border rounded-2xl bg-[#FFFFFA] dark:bg-[#272727] mt-10 "
            dir="rtl"
        >
            <section className="w-full p-6">

                <div className="h-100 overflow-y-scroll">

                    {data?.comments?.map((comment) => (

                        <div key={comment.id} className="mb-10">

                            <div className="flex items-center gap-3 mb-3 border-b pb-3">

                                <Image
                                    src={userprofile}
                                    alt="profile"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div className="flex flex-col">
                                    <span className="font-bold text-lg text-gray-900 dark:text-[#D9D9E0]">
                                        {comment.user?.firstName} {comment.user?.lastName}
                                    </span>

                                    <span className="text-gray-400 text-sm">
                                        {new Date(comment.created_at).toLocaleDateString("fa-IR")}
                                    </span>
                                </div>

                                {/* <button
                                    onClick={() => setParentCommentId(comment.id)}
                                    className="text-sm text-[#1d3557] hover:underline"
                                >
                                    پاسخ
                                </button> */}

                                <button
                                    onClick={() => handleEdit(comment)}
                                    className="text-sm text-[#1d3557] hover:underline border p-3 rounded-full "
                                >
                                    ویرایش
                                </button>

                            </div>

                            <p className="text-gray-500 dark:text-[#D9D9E0] leading-8 text-sm md:text-base">
                                {comment.caption}
                            </p>

                        </div>

                    ))}

                </div>


                {/* create / update comments */}

                <div className="mb-8">

                    <p className="font-bold text-gray-900 mb-4 text-base dark:text-[#D9D9E0]">
                        {editingCommentId ? "ویرایش نظر" : "نظر خود را وارد کنید"}
                    </p>

                    <div className="bg-[#f5f5f5] dark:bg-[#353535] rounded-2xl p-4 flex flex-col gap-4">

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="عنوان نظر"
                            className="bg-white dark:bg-[#2b2b2b] rounded-xl px-4 py-3 outline-none text-sm text-gray-700 dark:text-white placeholder:text-gray-400"
                        />

                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="نظر خود را بنویسید..."
                            rows={4}
                            className="bg-white dark:bg-[#2b2b2b] rounded-xl px-4 py-3 outline-none resize-none text-sm text-gray-700 dark:text-white placeholder:text-gray-400"
                        />

                        <div className="flex justify-end">
                            <button
                                onClick={handleSendComment}
                                className="bg-[#1d3557] hover:bg-[#16324f] text-white text-sm px-6 py-2 rounded-full transition-all duration-200"
                            >
                                {editingCommentId ? "ویرایش نظر" : "ارسال نظر"}
                            </button>
                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
};

export default ReserveComments;
