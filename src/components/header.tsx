export default function Header() {
    return (
        <header className="text-white bg-ilblue w-full">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Find My Lab</h1>
                <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-white hover:underline">Home</a></li>
                    <li><a href="/about" className="text-white hover:underline">About</a></li>
                    <li><a href="/contact" className="text-white hover:underline">Contact</a></li>
                </ul>
                </nav>
            </div>
        </header>
    );
}