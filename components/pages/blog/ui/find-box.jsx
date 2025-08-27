import Image from "next/image";

export default function FindBox() {
    return (
        <form action="/">
            <div className="form-searchbox">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                />
                <button className="btn-reset">
                    <Image
                        height={22}
                        width={22}
                        src="/image/icons/icon-search.svg"
                        alt="iocn"
                    />
                </button>
            </div>
        </form>
    );
}
