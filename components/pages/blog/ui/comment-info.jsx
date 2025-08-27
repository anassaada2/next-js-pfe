import Image from "next/image";
import Link from "next/link";

export default function CommentInfo({ data }) {
    return (
        <div className="comment-widget">
            <div className="comment-widget__image">
                <Image
                    height={80}
                    width={80}
                    src={data.profile}
                    alt="author"
                    className="object-image"
                />
            </div>
            <div className="comment-widget__body">
                <p>{data.comment}</p>
                <div className="comment-widget__footer">
                    <div className="comment-widget__user-info">
                        <h3 className="comment-widget__username">
                            {data.name}
                        </h3>
                        <span>{data.published}</span>
                    </div>
                    <Link href="/" className="btn-replay">
                        <Image
                            height={18}
                            width={18}
                            src="/image/icons/icon-replay.svg"
                            alt="icon"
                        />
                        Reply
                    </Link>
                </div>
            </div>
        </div>
    );
}
