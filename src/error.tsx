"use client";

export default function Error({ error }: { error: Error }) {
    return (
        <div className="mx-auto my-4 w-5/6 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-red-500">
                Something went wrong!
            </h1>
            <p>{error.message}</p>
        </div>
    );
}
