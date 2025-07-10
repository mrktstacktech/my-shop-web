import { Link } from "react-router-dom";
export function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh]  p-4">
            <div className="text-6xl font-bold text-center">404 Not Found</div>
            <div className="text-sm text-center mt-7 mb-4">Your visited page not found. You may go home page.</div>
            <div className="text-center mt-7">
                <Link to="/" className="text-white bg-red-600 p-2 px-4 rounded hover:bg-red-700 transition-colors duration-300">
                    Go to Home
                </Link>

            </div>
        </div>
    );
}
