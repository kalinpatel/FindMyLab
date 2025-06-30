export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <h1 className="text-4xl font-bold mb-4 text-black">Welcome to Find My Lab</h1>
            <p className="text-lg mb-6 text-black">Your one-stop solution for finding the best labs.</p>
            <a href="/labs" className="text-blue-500 hover:underline">Explore Labs</a>
        </div>
    );
}