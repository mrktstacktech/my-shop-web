export function HomePage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
                <p className="text-lg text-gray-700 mb-8">This is the homepage of our application.</p>
                <a href="/signup" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Go to Signup
                </a>
            </div>
        </>
    );
}